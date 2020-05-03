import { TAG_HOST, TAG_TEXT, TAG_ROOT, TEXT, PLACEMENT } from '../react/constant'
import { patchProps } from './utils'

let workInProgressRoot = null
let nextUnitOfWork = null

export function schedule(rootFiber) {
  workInProgressRoot = rootFiber
  nextUnitOfWork = workInProgressRoot
}

function beginWork(currentFiber) {
  const tag = currentFiber.tag
  if (tag === TAG_ROOT) {
    updateRoot(currentFiber)
  } else if (tag === TAG_TEXT) {
    updateTextHost(currentFiber)
  } else if (tag === TAG_HOST) {
    updateHostComponent(currentFiber)
  }
}

function updateHostComponent(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
  const children = currentFiber.props.children
  reconcilerChildren(currentFiber, children)
}

function updateTextHost(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
}

function updateRoot(currentFiber) {
  const children = currentFiber.props.children || []
  reconcilerChildren(currentFiber, children)
}

function createDOM(fiber) {
  if (fiber.tag === TAG_TEXT) return document.createTextNode(fiber.props.text)
  const dom = document.createElement(fiber.type)
  patchProps(dom, {}, fiber.props)
  fiber.stateNode = dom
  return dom
}

function reconcilerChildren(currentFiber, children) {
  let index = 0
  let previous = null
  while(index < children.length) {
    const child = children[index]
    let tag
    if (child.type === TEXT) {
      tag = TAG_TEXT
    } else if (typeof child.type === 'string') {
      tag = TAG_HOST
    }
    const fiber = {
      tag,
      type: child.type,
      props: child.props,
      stateNode: null,
      return: currentFiber,
      sibling: null,
      effectTag: PLACEMENT,
      firstEffect: null,
      nextEffect: null,
      lastEffect: null
    }
    if (index === 0) {
      currentFiber.child = fiber
    } else {
      previous.sibling = fiber
    }
    index++
    previous = fiber
  }
}

function completeOfWork(currentFiber) {
  const returnFiber = currentFiber.return
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect
    }
    if (returnFiber.lastEffect) {
      returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
    }
    returnFiber.lastEffect = currentFiber.lastEffect

    const effectTag = currentFiber.effectTag
    if (effectTag) { // 把当前fiber给到父亲身上
      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = currentFiber
      }
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber
      }
      returnFiber.lastEffect = currentFiber
    }
  }
}

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber)
  if (currentFiber.child) {
    return currentFiber.child
  }
  while(currentFiber) {
    completeOfWork(currentFiber)
    if (currentFiber.sibling) return currentFiber.sibling
    currentFiber = currentFiber.return
  }
}

function commitRoot() {
  let nextEffect = workInProgressRoot.firstEffect
  while(nextEffect) {
    commitFiber(nextEffect)
    nextEffect = nextEffect.nextEffect
  }
  workInProgressRoot = null
}

function commitFiber(currentFiber) {
  const returnDOM = currentFiber.return.stateNode
  const effect = currentFiber.effectTag
  if (effect) {
    if (effect === PLACEMENT && currentFiber.stateNode) {
      returnDOM.appendChild(currentFiber.stateNode)
    }
  }
  currentFiber.effectTag = null
}

function workLoop(deadline) {
  let shouldYield = false
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop, { timeout: 500 })
}

requestIdleCallback(workLoop, { timeout: 500 })