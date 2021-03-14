import { createDom, render, updateProps } from '../react-dom'
import { REACT_TEXT } from '../shared/constant'
import { runHooks, runGetDerivedStateFromProps } from '../shared/utils'

export const updateQueue = {
  isBatchingUpdate: false, // 当前是否正在批量更新
  updater: new Set(), // 待处理的更新
  batchUpdate() {
    for (const updater of this.updater) {
      updater.updateClassComponent()
    }
    this.updater.clear()
    this.isBatchingUpdate = false
  }
}

class Updater {
  constructor(instance) {
    this.instance = instance // 当前组件实例
    this.pendingState = []
    this.callbacks = []
  }
  addState(partialState, callback) {
    if (typeof callback === 'function') {
      this.callbacks.push(callback)
    }
    this.pendingState.push(partialState)

    if (updateQueue.isBatchingUpdate) { // 如果当前正在批量更新，那直接放到队列即可
      updateQueue.updater.add(this)
    } else { // 如果没有，那么进行强制更新
      this.updateClassComponent()
    }
  }

  updateClassComponent() {
    const { instance, pendingState } = this
    // debugger
    if (pendingState.length) {
      instance.pendingState = this.getState() // 无论是否更新组件，state都会更新
      // runHooks(instance, 'componentWillReceiveProps', instance.props, instance.state)
      this.emitUpdate(instance.props, instance.pendingState)
    }
  }

  emitUpdate(nextProps, nextState) {
    const { instance, callbacks } = this
    // 由用户自己决定是否更新
    let update = true
    update = runHooks(instance, 'shouldComponentUpdate', nextProps, nextState)
    // 无论是否要进行渲染，都会更新state
    if (update) {
      runHooks(instance, 'componentWillUpdate', nextProps, nextState)
      if (nextProps) {
        this.nextProps = nextProps
        instance.props = nextProps
      }
      if (nextState) {
        instance.state = nextState
      }
      instance.updateComponent() // 强制更新
      callbacks.forEach(cb => cb()) // 等状态更新完成以后统一执行回调
      callbacks.length = 0
    } else {
      if (nextProps) {
        this.nextProps = nextProps
        instance.props = nextProps
      }
      if (nextState) {
        instance.state = nextState
      }
    }
  }

  getState() {
    const { instance, pendingState } = this
    const { pendingState: lastestState } = instance
    let newState = { ...lastestState }

    pendingState.forEach(nextState => {
      if (typeof next === 'function') { // 处理nextState为函数的情况
        const ret = nextState(newState)
        if (typeof ret === 'object') {
          nextState = ret
        }
      }
      newState = { ...newState, ...nextState }
    })
    instance.pendingState = newState
    newState = runGetDerivedStateFromProps(instance, instance.pendingProps, instance.pendingState)
    pendingState.length = 0 
    return newState
  }
}
class Component {
  static isReactComponent = true // 标记当前是类组件
  constructor(props) {
    this.props = props
    this.updater = new Updater(this)
  }

  setState(partialState, callback) {
    // 让更新器处理逻辑
    this.updater.addState(partialState, callback)
  }

  forceUpdate() {
    runGetDerivedStateFromProps(this, this.props, this.state)
    
    this.updateComponent()
  }

  updateComponent() {
    // 更新context的值
    this.context = this.constructor.contextType !== undefined ? this.constructor.contextType.Provider._value : {}
    const newVdom = this.render()
    const oldVdom = this.oldVdom
    const thirdArgument = runHooks(this, 'getSnapshotBeforeUpdate')
    this.oldVdom = compareTwoVdom(this.dom.parentNode, oldVdom, newVdom)
    // 更新完毕
    runHooks(this, 'componentDidUpdate', this.props, this.state, thirdArgument)
  }

  render() {
    throw new Error('该方法需要子类实现')
  }
}

/**
 * 比较两个新老虚拟dom，返回最新值
 * @param {*} parent 父元素真实dom
 * @param {*} oldVdom 老的虚拟dom
 * @param {*} newVdom 新的虚拟dom
 * @param {*} anchor oldVdom的下一个真实dom节点
 */
function compareTwoVdom(parent, oldVdom, newVdom, anchor = null) {
  if (oldVdom && newVdom && oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
    const dom = newVdom.dom = oldVdom.dom
    if (oldVdom.props.content !== newVdom.props.content) {
      dom.textContent = newVdom.props.content
    }
    return newVdom
  } else if (!oldVdom && !newVdom) { // 新老都为 { null } 
    return null
  } else if (!oldVdom) { // 老节点不存在，新增了新节点
    // render(parent, newVdom)
    const newDom = createDom(newVdom)
    parent.insertBefore(newDom, anchor)
    return newVdom
  } else if (!newVdom) { // 新节点不存在，删除老节点
    const childDOM = findDom(oldVdom)
    parent.removeChild(childDOM)
    // 执行老组件的卸载方法
    runHooks(oldVdom.instance, 'componentWillUnmount')
    return null
  } else if (oldVdom.type === newVdom.type && oldVdom.key === newVdom.key) {
    // 此处进行dom-diff
    updateElement(oldVdom, newVdom)
    return newVdom
  } else { // 新老不能复用，用新的替换老的
    const oldDom = findDom(oldVdom)
    const newDom = createDom(newVdom)
    runHooks(oldVdom.instance, 'componentWillUnmount')
    parent.replaceChild(newDom, oldDom)
    return newVdom
  }
}

function updateElement(oldVNode, newVNode) {
  // 更新文本节点
  if (oldVNode.type === REACT_TEXT && newVNode.type === REACT_TEXT) {
    const dom = newVNode.dom = oldVNode.dom
    if (newVNode.props.content !== oldVNode.props.content) {
      dom.textContent = newVNode.props.content
    }
    return
  } else if (typeof oldVNode.type === 'string') { // 说明是div之类的原生组件
    const dom = newVNode.dom = oldVNode.dom
    updateProps(dom, oldVNode.props, newVNode.props) // 这里处理非children以外的属性
    // 只有原生组件div、p才进行深度比较
    updateChildren(dom, oldVNode.props.children, newVNode.props.children)
  } else if (typeof oldVNode.type === 'function') {
    if (oldVNode.type.isReactComponent) {
      // 更新类组件
      updateClassComponent(oldVNode, newVNode)
    } else {
      // 更新函数组件
      updateFunctionComponent(oldVNode, newVNode)
    }
  }
}

/**
 * 更新类组件
 * @param {*} oldVNode 老虚拟dom
 * @param {*} newVNode 新虚拟dom
 */
function updateClassComponent(oldVNode, newVNode) {
  const instance = newVNode.instance = oldVNode.instance // 复用实例
  newVNode.oldVdom = oldVNode.oldVdom
  instance.context = instance.constructor.contextType !== undefined ? instance.constructor.contextType.Provider._value : {}
  // 更新
  instance.pendingProps = newVNode.props
  instance.pendingState = instance.updater.getState()
  instance.updater.emitUpdate(instance.pendingProps, instance.pendingState)
}

/**
 * 更新函数组件
 * @param {*} oldVdom 老虚拟dom
 * @param {*} newVdom 新虚拟dom
 */
function updateFunctionComponent(oldVNode, newVNode) {
  const parentDom = findDom(oldVNode).parentNode // 找到父节点的真实dom
  const oldVdom = oldVNode.oldVdom // 之前的虚拟dom
  const { type, props } = newVNode
  const newVdom = type(props) // 生成新的虚拟dom
  newVNode.oldVdom = compareTwoVdom(parentDom, oldVdom, newVdom)
}

function updateChildren(dom, oldChildren, newChildren) {
  oldChildren = Array.isArray(oldChildren) ? oldChildren : !!oldChildren ? [oldChildren] : []
  newChildren = Array.isArray(newChildren) ? newChildren : !!newChildren ? [newChildren] : []
  const maxLen = Math.max(oldChildren.length, newChildren.length)
  for (let i = 0; i < maxLen; i++) {
    const anchor = oldChildren.find((item, index) => index > i && item && item.dom)
    compareTwoVdom(dom, oldChildren[i], newChildren[i], anchor && anchor.dom)
  }
}

function findDom(vnode) {
  const type = vnode.type
  let dom
  if (typeof type === 'function') {
    dom = findDom(vnode.oldVdom)
  } else {
    dom = vnode.dom
  }
  return dom
}

export {
  Component
}

export default Component
