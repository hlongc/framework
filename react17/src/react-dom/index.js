import { addEvent } from './event'
import { runHooks, runGetDerivedStateFromProps, isFunction } from '../shared/utils'
import { REACT_TEXT } from '../shared/constant'

export function render(vnode, container) {
  const dom = createDom(vnode)
  container.appendChild(dom)
  // 组件挂载完成
  runHooks(dom, 'componentDidMount')
}


/**
 * 根据虚拟节点创建真实dom
 * @param {*} vnode 虚拟节点
 */
export function createDom(vnode) {
  // debugger
  const { type, props, ref } = vnode
  let dom
  if (type === REACT_TEXT) {
    vnode.dom = document.createTextNode(props.content)
    if (ref) {
      ref.current = vnode.dom
    }
    return vnode.dom
  } else if (typeof type === 'function') {
    if (type.isReactComponent) {
      return mountClassComponent(vnode)
    } else {
      return mountFunctionComponent(vnode)
    }
  } else {
    dom = document.createElement(type) // 创建真实dom
    if (ref) {
      ref.current = dom
    }
  }
  updateProps(dom, {}, props) // 更新样式
  const children = props.children
  // 子元素只有一个且为虚拟节点，那就递归渲染孩子节点
  if (typeof children === 'object' && children !== null && children.type) {
    render(children, dom)
  } else if (Array.isArray(children)) {
    reconcileChildren(dom, children)
  } else { // 普通对象
    dom.textContent = children.toString ? children.toString() : ''
  }
  vnode.dom = dom
  return dom
}

/**
 * 挂载类组件
 * @param {*} vnode 虚拟节点
 */
function mountClassComponent(vnode) {
  const { type: ClassComponent, props } = vnode
  const instance = new ClassComponent(props)
  // context赋值
  instance.context = ClassComponent.contextType !== undefined ? ClassComponent.contextType.Provider._value : {}

  instance.pendingState = instance.state || {}
  instance.pendingProps = props
  // 组件即将挂载
  // getDerivedStateFromProps在render之前执行
  runGetDerivedStateFromProps(instance, instance.pendingProps, instance.pendingState)
  const oldVdom = instance.render()
  const dom = createDom(oldVdom)
  vnode.instance = instance // 实例绑定到虚拟节点上面
  dom.componentDidMount = isFunction(instance.componentDidMount) ? instance.componentDidMount.bind(instance) : () => {}
  instance.oldVdom = oldVdom
  instance.dom = dom
  vnode.dom = dom // 把真实dom保存在当前的vnode上面
  vnode.oldVdom = oldVdom // 当前组件产生的vdom
  return dom
}

/**
 * 挂载函数组件
 * @param {*} vnode 虚拟节点
 */
function mountFunctionComponent(vnode) {
  const { type: FunctionComponent, props } = vnode
  const returnVal = FunctionComponent(props)
  vnode.oldVdom = returnVal
  return createDom(returnVal)
}

function reconcileChildren(parentDom, children) {
  children.forEach(child => {
    render(child, parentDom)
  })
}

export function updateProps(dom, oldProps,newProps) {
  for (const key in newProps) {
    if (key === 'children') continue
    if (key === 'style') {
      const style = newProps[key]
      for (const attr in style) {
        dom.style[attr] = style[attr]
      }
    } else {
      if (key.startsWith('on')) { // 处理事件
        // onClick => onclick
        // dom[key.toLocaleLowerCase()] = newProps[key]
        addEvent(dom, key.toLocaleLowerCase(), newProps[key])
      } else {
        dom[key] = newProps[key]
      }
    }
  }
}

const ReactDOM = {
  render
}

export default ReactDOM