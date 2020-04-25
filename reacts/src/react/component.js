import { onlyOne, pacthProps } from "../react-dom/utils";
import { createDOM } from "../react-dom/vdom";
import { unstable_batchedUpdates } from '../react-dom'
import { TEXT, ELEMENT, FUNCTION_COMPONENT, CLASS_COMPONENT, MOVE, REMOVE, INSERT } from "./constant";

let depth = 0 // 当前遍历的深度
const patchQueue = [] // patch补丁包

export const updateQueue = {
  isPending: false, // false表示当前不是批量更新模式，true表示当前为批量更新模式
  updaters: [], // 全局更新队列，包含一个个待更新的updater实例
  add(updater) { // 向队列中新增updater
    this.updaters.push(updater)
  },
  batchUpdate() { // 批量更新
    if (this.isPending) return // 如果正在进行批量更新，那只能等此次更新完毕再更新了
    this.isPending = true
    let updater
    while (updater = this.updaters.pop()) { // 依次弹出updater进行更新
      updater.updateComponent()
    }
    this.isPending = false
  }
}

class Updater{
  constructor(componentInstance) {
    this.componentInstance = componentInstance // updater和类组件一一对应
    this.pendingState = [] // 当前组件未处理的state更新队列
    this.nextProps = null // 新的属性对象
  }

  addState(updater) {
    this.pendingState.push(updater) // 放到更新队列中
    this.emitUpdate() // 尝试进行更新
  }
  emitUpdate(nextProps) {
    this.nextProps = nextProps // 更新下次props的值
    // 如果当前props发生变化了，或者当前不是批量更新模式，那么立即进行更新
    if (this.nextProps || !updateQueue.isPending) {
      this.updateComponent()
    } else {
      updateQueue.add(this)
    }
  }
  updateComponent() {
    const { componentInstance, pendingState, nextProps } = this
    // 如果nextProps有值或者state更新队列长度大于0，那么进行更新
    if (nextProps || pendingState.length) {
      shouldUpdate(componentInstance, nextProps, this.getState())
    }
  }
  getState() {
    let { pendingState, nextProps, componentInstance } = this
    let state = componentInstance.state // 之前的老状态
    if (pendingState.length) {
      pendingState.forEach(nextState => {
        if (typeof nextState === 'function') { // 如果setState传入的是一个函数，那么执行它得到改变的结果
          nextState = nextState.call(componentInstance, state, nextProps)
        }
        state = { ...state, ...nextState }
      })
      pendingState.length = 0 // 清空state更新队列
    }
    return state
  }
}

function shouldUpdate(componentInstance, nextProps, nextState) {
  // 无论视图是否更新，数据都要更新
  componentInstance.props = nextProps
  componentInstance.state = nextState
  // 如果传入了componentShouldUpdate生命周期，并且返回值是假值的话，那么不会进行视图更新
  if (componentInstance.shouldComponentUpdate && !componentInstance.shouldComponentUpdate(nextProps, nextState)) {
    return
  }
  componentInstance.forceUpdate()
}
// 新老节点比较
function compareElement(oldVNode, newVNode) {
  oldVNode = onlyOne(oldVNode)
  newVNode = onlyOne(newVNode)

  let oldDom = oldVNode.dom
  let currentNode = oldVNode
  if (newVNode === null) { // 新节点被删除了，则移除老节点
    oldDom.parentNode.removeChild(oldDom)
    currentNode = null
  } else if (oldVNode.type !== newVNode.type) { // 类型不同，直接重新创建
    const currentDOM = createDOM(newVNode)
    oldDom.parentNode.replaceChild(currentDOM, oldDom)
  } else { // 如果类型相同，那么进行dom-diff
    updateElement(oldVNode, newVNode)
  }
  return currentNode
}

function updateElement(oldVNode, newVNode) {
  const dom = newVNode.dom = oldVNode.dom // 复用老的真实节点
  if (oldVNode.$$typeof === TEXT && newVNode.$$typeof === TEXT) { // 都是文本节点的话，更新文本即可
    if (oldVNode.content !== newVNode.content) {
      dom.textContent = newVNode.content
    }
  } else if (oldVNode.$$typeof === ELEMENT) { // 如果都是原生类型 span div
    updateDOMProperties(dom, oldVNode.props, newVNode.props)
    // 更新孩子
    updateChildrenElements(dom, oldVNode.props.children, newVNode.props.children)
    oldVNode.props = newVNode.props // 把新的属性给到老的节点上面，包括新的虚拟dom，因为compareElement返回的是老节点
  } else if (oldVNode.$$typeof === FUNCTION_COMPONENT) { // 函数组件更新
    updateFunctionComponent(oldVNode, newVNode)
  } else if (oldVNode.$$typeof === CLASS_COMPONENT) {
    updateClassComponent(oldVNode, newVNode)
  }
}

function patch() {
  const deleteMap = {}
  const deleteList = []
  // 先删除节点，才能保证顺序不乱
  patchQueue.forEach(diff => {
    const { type, from, parent } = diff
    if (type === MOVE || type === REMOVE) {
      // parentNode.children只能获取到非文本节点,而childNodes可以获取所有节点
      const dom = parent.childNodes[from] // 从对应位置取到要删除的节点
      deleteList.push(dom)
      deleteMap[from] = dom // 后面可以复用，因为move是先删除后插入，所以要保留这个元素
    }
  })
  // 删除不要的元素
  deleteList.forEach(childNode => {
    childNode.parentNode.removeChild(childNode) // 从父节点中把自己删除
  })
  // 进行插入操作
  patchQueue.forEach(diff => {
    const { type, from, to, parent, dom } = diff
    if (type === INSERT) {
      insertNode(parent, dom, to)
    }
    if (type === MOVE) {
      insertNode(parent, deleteMap[from], to)
    }
  })
}

function insertNode(parent, dom, index) {
  const target = parent.children[index]
  // 如果当前位置有元素那么久插入到它前面，没有直接append
  target ? parent.insertBefore(dom, target) : parent.appendChild(dom)
}

function updateChildrenElements(parent, oldChildren, newChildren) {
  depth++
  diff(parent, oldChildren, newChildren)
  depth--
  if (depth === 0) { // 如果回到了第一层，代表已经比较完毕，那么可以开始最终的dom操作了
    patch()
    patchQueue.length = 0
  }
}

function diff(parent, oldChildren, newChildren) {
  let lastIndex = 0
  const oldChildrenMap = getOldChildrenMap(oldChildren) // 根据老元素简历映射表，减少时间复杂度
  const newChildrenMap = getNewChildrenMap(oldChildrenMap, newChildren) // 根据新老元素建立映射表
  newChildren.forEach((newChild, index) => {
    if (newChild) {
      const key = newChild.key || index.toString()
      const oldChild = oldChildrenMap[key]
      if (newChild === oldChild) { // 说明复用了
        if (oldChild._mountIndex < lastIndex) { // 如果当前的挂载索引小于lastIndex，那么需要移动元素
          patchQueue.push({
            parent,
            type: MOVE,
            from: oldChild._mountIndex,
            to: index
          })
        }
        lastIndex = Math.max(oldChild._mountIndex, lastIndex)
      } else {
        // 不能复用就直接生成并且插入
        patchQueue.push({
          parent,
          type: INSERT,
          to: index,
          dom: createDOM(newChild)
        })
      }
      newChild._mountIndex = index // 无论元素是否能被复用,都要更新挂载的索引
    } else { // 如果新元素为Null，那么要卸载元素，并且执行生命周期
      const key = index.toString()
      const oldChild = oldChildrenMap[key]
      if (oldChild && oldChild.instance.componentWillUnmount) {
        unstable_batchedUpdates(() => oldChild.instance.componentWillUnmount())
      }
    }
  })

  // 当新节点遍历完以后，删除多余的老节点
  for (const key in oldChildrenMap) {
    if (!newChildrenMap.hasOwnProperty(key)) {
      patchQueue.push({
        parent,
        type: REMOVE,
        from: oldChildrenMap[key]._mountIndex,
        dom: oldChildrenMap[key].dom
      })
    }
  }
}

function getNewChildrenMap(oldChildrenMap, newChildren) {
  return newChildren.reduce((memo, newNode, index, arr) => {
    if (newNode) {
      const key = newNode.key || index.toString()
      const oldNode = oldChildrenMap[key] // 从老的map中找到对应的元素
      if (oldNode && isSameElement(oldNode, newNode)) { // 如果存在对应key的元素，并且能复用的话
        updateElement(oldNode, newNode) // 就递归比较子元素
        arr[index] = oldNode // 复用老的虚拟节点 
      } 
      memo[key] = arr[index]
    }
    return memo
  }, {})
}

// key和type一样才能复用元素
function isSameElement(old, news) {
  return old.type === news.type
}

function getOldChildrenMap(oldChildren) {
  return oldChildren.reduce((memo, current, index) => {
    if (current) {
      const key = current.key || index.toString() // 如果有key就用key,没有就用索引
      memo[key] = current
    }
    return memo
  }, {})
}

function updateClassComponent(oldVNode, newVNode) {
  const oldInstance = newVNode.instance = oldVNode.instance // 在第一次创建时，把创建的实例已经放到了虚拟dom上面
  const nextProps = newVNode.props // 拿到最新属性
  if (oldVNode.type.contextType) { // 如果有context这个静态属性，则给到实例上
    oldInstance.context = oldVNode.type.contextType.Provider.value
  }
  if (oldInstance.componentWillReceiveProps) { // 执行生命周期函数
    unstable_batchedUpdates(() => oldInstance.componentWillReceiveProps(nextProps))
  }
  if (oldVNode.type.getDerivedStateFromProps) {
    // 获取衍生状态进行合并
    const partialState = oldVNode.type.getDerivedStateFromProps(nextProps, oldInstance.state)
    if (partialState) {
      oldInstance.state = { ...oldInstance.state, ...partialState }
    }
  }
  oldInstance.$updater.emitUpdate(nextProps) // 实例上面有个更新器$updater,并且调用尝试更新的方法
}

function updateFunctionComponent(oldVNode, newVNode) {
  const oldRenderElement = oldVNode.renderElement // 取到上次的react元素
  const newRenderElement = newVNode.type(newVNode.props) // 得到这次新的react元素
  const currentRenderElement = compareElement(oldRenderElement, newRenderElement) // 进行比较
  newVNode.renderElement = currentRenderElement // 把合并后的最新值重新给到newVNode上
}

function updateDOMProperties(dom, oldProps, newProps) {
  pacthProps(dom, oldProps, newProps)
}

class Component {
  constructor(props, context) {
    this.props = props
    this.context = context
    this.$updater = new Updater(this) // 每个类组件的更新器
    this.nextProps = null // 下个属性
    this.state = {} // 当前状态
  }

  setState(partialState) {
    this.$updater.addState(partialState) // 放到更新队列中
  }

  forceUpdate() {
    // renderElement 这个是上一次渲染的实例
    const { props, state, renderElement: oldRenderElement } = this
    if (this.componentWillUpdate) {
      unstable_batchedUpdates(() => this.componentWillUpdate(props, state))
    }
    const newRenderElement = this.render() // 重新render获取新的react元素
    const currentRenderElement = compareElement(oldRenderElement, newRenderElement)
    const extra = this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate()
    // 把新的实例赋给renderElement供下次使用
    this.renderElement = currentRenderElement
    if (this.componentDidUpdate) this.componentDidUpdate(props, state, extra)
  }
}
// isReactComponent用来标记当前是类组件
Component.prototype.isReactComponent = {}

class PureComponent extends Component{}
// 标记当前是纯类组件
PureComponent.prototype.isPureReactComponent = true

export {
  Component,
  PureComponent
}