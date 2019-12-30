/**
 * @param {Object} node react元素
 * @param {HTMLNode} container 父容器
 */
function render(node, container) {
  // 如果是文本节点，那就直接添加并返回
  if (typeof node === 'string') return container.appendChild(document.createTextNode(node))
  let type = node.type
  let props = node.props
  if (type.isReactComponent) { // 说明是类组件,new 类，得到实例，调用实例的render方法，得到react元素
    const element = new type(props).render()
    type = element.type
    if (typeof type === 'function') { // 如果返回的还是一个函数，那么递归渲染，直到找到react元素为止
      return render(element, container)
    }
    props = element.props
  } else if (typeof type === 'function') { // 如果是函数式组件，那么执行函数并传入props属性，得到返回的react元素
    const element = type(props)
    type = element.type
    if (typeof type === 'function') { // 如果返回的还是一个函数，那么递归渲染，直到找到react元素为止
      return render(element, container)
    }
    props = element.props
  }

  const current = document.createElement(type)
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
      // for (const attr in styleObj) {
      //   current.style[attr] = styleObj[attr]
      // }
      const cssText = Object.keys(styleObj).map(attrName => {
        // 把backgroudColor => backgroud-color
        const attrName1 = attrName.replace(/([A-Z])/g, function() {
          return '-' + arguments[1].toLowerCase()
        })
        return `${attrName1}:${styleObj[attrName]}`
      }).join(';')
      current.style.cssText = cssText
    } else {
      current.setAttribute(propName, props[propName])
    }
  }

  container.appendChild(current)
}

export default {
  render
}