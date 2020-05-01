import { TAG_ROOT } from '../react/constant'
import { schedule } from './schedule'

function render(vnode, container) {
  // 创建rootFiber
  const rootFiber = {
    tag: TAG_ROOT,
    stateNode: container,
    props: { children: [vnode] }
  }
  // 进行渲染
  schedule(rootFiber)
}

export default {
  render
}