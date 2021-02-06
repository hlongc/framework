import { addEvent } from './event'

export function render(vnode, container) {
  const dom = createDom(vnode)
  container.appendChild(dom)
}

/**
 * 根据虚拟节点创建真实dom
 * @param {*} vnode 虚拟节点
 */
export function createDom(vnode) {
  if (typeof vnode === 'number' || typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }
  const { type, props } = vnode
  let dom
  if (typeof type === 'function') {
    if (type.isReactComponent) {
      return mountClassComponent(vnode)
    } else {
      return mountFunctionComponent(vnode)
    }
  } else {
    dom = document.createElement(type) // 创建真实dom
  }
  updateProps(dom, props) // 更新样式
  const children = props.children
  // 子元素为文本
  if (typeof children === 'number' || typeof children === 'string') {
    dom.textContent = children
    // 子元素只有一个且未虚拟节点
  } else if (typeof children === 'object' && children !== null && children.type) {
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
  const returnVal = instance.render()
  instance.dom = createDom(returnVal) // 把真实dom保存在当前的实例上
  return instance.dom
}

/**
 * 挂载函数组件
 * @param {*} vnode 虚拟节点
 */
function mountFunctionComponent(vnode) {
  const { type: FunctionComponent, props } = vnode
  const returnVal = FunctionComponent(props)
  return createDom(returnVal)
}

function reconcileChildren(parentDom, children) {
  children.forEach(child => {
    render(child, parentDom)
  })
}

function updateProps(dom, newProps) {
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