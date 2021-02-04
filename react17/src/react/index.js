
/**
 * 创建虚拟dom
 * @param {*} type 元素类型
 * @param {*} config 属性
 * @param {*} children 孩子节点
 */
function createElement(type, config, children) {
  delete config.__self
  delete config.__source
  const props = { ...config }
  props.children = arguments.length > 3 ? [].slice.call(arguments, 2) : children
  return {
    type,
    props
  }
}

const React = {
  createElement
}

export default React