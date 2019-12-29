/**
 * @param {Object} node react元素
 * @param {HTMLNode} container 父容器
 */
function render(node, container) {
  // 如果是文本节点，那就直接添加并返回
  if (typeof node === 'string') return container.appendChild(document.createTextNode(node))
  const type = node.type
  const current = document.createElement(type)
  const props = node.props

  for (const propName in props) {
    if (propName === 'children') {
      let children = props.children
      // 判断当前children是一个还是多个，都转为数组
      if (!Array.isArray(children)) children = [children]
      children.forEach(child => render(child, current))
    } else if (propName === 'className') {
      current.className = props.className
    } else if (propName === 'style') {
      const styleObj = props.style
      for (const attr in styleObj) {
        current.style[attr] = styleObj[attr]
      }
    } else {
      current.setAttribute(propName, props[propName])
    }
  }

  container.appendChild(current)
}

export default {
  render
}