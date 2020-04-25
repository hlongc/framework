import { createDOM } from './vdom'
import { updateQueue } from '../react/component'

/**
 * @param {Object} node react元素
 * @param {HTMLNode} container 父容器
 */
function render(node, container) {
  const dom = createDOM(node)
  container.appendChild(dom)
}

function unstable_batchedUpdates(fn) {
  updateQueue.isPending = true
  fn()
  updateQueue.isPending = false
  updateQueue.batchUpdate()
}
export {
  unstable_batchedUpdates
}
export default {
  render
}