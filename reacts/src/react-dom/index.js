import { createDOM } from './vdom'

/**
 * @param {Object} node react元素
 * @param {HTMLNode} container 父容器
 */
function render(node, container) {
  const dom = createDOM(node)
  container.appendChild(dom)
}


export default {
  render
}