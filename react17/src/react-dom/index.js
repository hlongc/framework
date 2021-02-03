export function render(vnode, container) {
  const dom = createDom(vnode)
  container.appendChild(dom)
}

function createDom(vnode) {
  if (typeof vnode === 'number' || typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }
  const { type, props } = vnode
  const dom = document.createElement(type) // 创建真实dom
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
      dom[key] = newProps[key]
    }
  }
}

const ReactDOM = {
  render
}

export default ReactDOM