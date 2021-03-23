import { HOST_ROOT } from '../utils/constant'
import { scheduleRoot } from './schdule'

function render(element, container) {
  const rootFiber = {
    tag: HOST_ROOT,
    stateNode: container,
    props: { children: [element] }
  }
  scheduleRoot(rootFiber)
}

const ReactDOM = {
  render
}

export default ReactDOM