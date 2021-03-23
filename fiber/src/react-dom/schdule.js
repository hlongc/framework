import { CLASS_COMPONENT, FUNCTION_COMPONENT, HOST_COMPONENT, HOST_ROOT, HOST_TEXT, PLACEMENT, UPDATE } from '../utils/constant'

let workInProgessRoot = null // 当前正在更新的树
let nextUnitOfWork = null // 下一个工作单元
let currentFiberRoot = null // 上一次的渲染结果
const deletions = [] // 需要删除的fiber节点

export function scheduleRoot(rootFiber) {
  // 双缓冲，循环利用两个对象
  if (currentFiberRoot && currentFiberRoot.alternate) {
    workInProgessRoot = currentFiberRoot.alternate
    workInProgessRoot.props = rootFiber.props
    workInProgessRoot.alternate = currentFiberRoot
  } else if (currentFiberRoot) {
    rootFiber.alternate = currentFiberRoot
    workInProgessRoot = rootFiber
  } else {
    workInProgessRoot = rootFiber
  }
  workInProgessRoot.firstEffect = workInProgessRoot.lastEffect = workInProgessRoot.nextEffect = null
  nextUnitOfWork = workInProgessRoot
}

function isSame(o, n) {
  return o && n && o.type === n.type
}

function reconcileChildren(currentFiber, children) {
  let index = 0
  let oldChild = currentFiber.alternate && currentFiber.alternate.child
  let preSibling
  while (index < children.length || oldChild) {
    const child = children[index]
    let tag
    if (child && child.type === HOST_TEXT) {
      tag = HOST_TEXT
    } else if (child && typeof child.type === 'string') {
      tag = HOST_COMPONENT
    } else if (child && typeof child.type === 'function') {
      if (child.type.isReactComponent) {
        tag = CLASS_COMPONENT
      } else {
        tag = FUNCTION_COMPONENT
      }
    }
    let newFiber
    if (isSame(oldChild, child)) {
      if (oldChild.alternate) {
        newFiber = oldChild.alternate
        newFiber.props = child.props
        newFiber.effectTag = UPDATE
        newFiber.alternate = oldChild
        newFiber.firstEffect = null
        newFiber.lastEffect = null
      } else {
        // 类型相同就复用
        newFiber = {
          tag: oldChild.tag,
          type: oldChild.type,
          stateNode: oldChild.stateNode,
          return: currentFiber,
          props: child.props,
          alternate: oldChild,
          effectTag: UPDATE, // 当前的操作类型
          firstEffect: null,
          lastEffect: null
        }
      }
    } else {
      if (oldChild) {
        deletions.push(oldChild)
      }
      if (child) {
        // 不同就新建
        newFiber = {
          tag,
          type: child.type,
          stateNode: null,
          return: currentFiber,
          props: child.props,
          effectTag: PLACEMENT, // 当前的操作类型
          firstEffect: null,
          lastEffect: null
        }
      }
    }
    if (child) {
      if (index === 0) {
        currentFiber.child = newFiber
      } else {
        preSibling.sibling = newFiber
      }
    }
    if (oldChild) {
      oldChild = oldChild.sibling
    }
    index++
    preSibling = newFiber
  }
}

function updateHostRoot(rootFiber) {
  const children = rootFiber.props.children
  reconcileChildren(rootFiber, children)
}

function updateHostText(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDom(fiber)
  }
}

function updateHostComponent(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDom(fiber)
  }
  reconcileChildren(fiber, fiber.props.children)
}

// 创建真实dom和创建子元素对应的fiber
function beginWork(workInProgessFiber) {
  if (workInProgessFiber.tag === HOST_ROOT) {
    // 处理根fiber
    updateHostRoot(workInProgessFiber)
  } else if (workInProgessFiber.tag === HOST_TEXT) {
    // 处理文本节点
    updateHostText(workInProgessFiber)
  } else if (workInProgessFiber.tag === HOST_COMPONENT) {
    // 处理原生类型 div p span
    updateHostComponent(workInProgessFiber)
  }
}

function completeUnitOfWork(fiber) {
  const returnFiber = fiber.return
  if (!returnFiber) return
  // 先把子节点的更新挂载上去
  if (!returnFiber.firstEffect) {
    returnFiber.firstEffect = fiber.firstEffect
  }
  if (fiber.lastEffect) {
    if (returnFiber.lastEffect) {
      returnFiber.lastEffect.nextEffect = fiber.firstEffect
    }
    returnFiber.lastEffect = fiber.lastEffect
  }
  // 挂载自己的更新操作
  if (fiber.effectTag) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = fiber
    }
    if (returnFiber.lastEffect) {
      returnFiber.lastEffect.nextEffect = fiber
    }
    returnFiber.lastEffect = fiber
  }
}

// 有儿子返回儿子，没儿子返回兄弟，没兄弟返回叔叔
function performUnitOfWork(workInProgessFiber) {
  beginWork(workInProgessFiber)
  if (workInProgessFiber.child) {
    return workInProgessFiber.child
  }
  while (workInProgessFiber) {
    completeUnitOfWork(workInProgessFiber)
    if (workInProgessFiber.sibling) {
      return workInProgessFiber.sibling
    }
    workInProgessFiber = workInProgessFiber.return
  }
}

function commitRoot() {
  deletions.forEach(fiber => {
    const parentNode = fiber.return.stateNode
    const child = fiber.stateNode
    parentNode.removeChild(child)
  })
  deletions.length = 0
  let current = workInProgessRoot.firstEffect
  while (current) {
    if (current.effectTag === PLACEMENT) {
      current.return.stateNode.appendChild(current.stateNode)
    } else if (current.effectTag === UPDATE) {
      if (current.tag === HOST_TEXT) {
        if (current.props.text !== current.alternate.props.text) {
          current.stateNode.textContent = current.props.text
        }
      } else {
        updateProps(current.stateNode, current.alternate.props, current.props)
      }
    }
    current.effectTag = null
    current = current.nextEffect
  }
  currentFiberRoot = workInProgessRoot
  workInProgessRoot = null
}

function workLoop(deadLine) {
  let shouldYield = false // 是否要把控制器还给浏览器
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadLine.timeRemaining() < 1
  }

  if (!nextUnitOfWork && workInProgessRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop, { timeout: 500 })  
}

requestIdleCallback(workLoop, { timeout: 500 })

function createDom(fiber) {
  if (fiber.tag === HOST_TEXT) {
    return document.createTextNode(fiber.props.text)
  } else if (fiber.tag === HOST_COMPONENT) {
    const dom = document.createElement(fiber.type)
    updateProps(dom, {}, fiber.props)
    return dom
  }
}

function updateProps(dom, oldProps, newProps) {
  for (const k in oldProps) {
    if (!newProps.hasOwnProperty(k)) {
      dom.removeAttribute(k)
    }
  }

  for (const key in newProps) {
    if (key === 'children') continue
    if (key === 'style') {
      const style = newProps.style
      for (const n in style) {
        dom.style[n] = style[n]
      }
    } else if (key === 'className') {
      dom.className = newProps.className
    } else if (/^on/.test(key)) {
      dom[key.toLocaleLowerCase()] = newProps[key]
    } else {
      dom.setAttribute(key, newProps[key])
    }
  }
}