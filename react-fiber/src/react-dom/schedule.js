import { TAG_ROOT, TAG_HOST, TAG_TEXT, TEXT, PLACEMENT, DELETE, UPDATE, CLASS_COMPONENT, FUNCTION_COMPONENT } from '../react/constant'
import { patchProps } from './utils'
import { UpdateQueue } from '../react/updateQueue';

let workInProgressRoot = null // 根fiber
let nextUnitOfWork = null // 当前正在执行的fiber
let currentRoot = null // 之前渲染完成的fiber树
const deletions = [] //保存需要删除的fiber
// 进行调度
export function schedule(rootFiber) {
  // 双缓冲，减少对象的创建，复用对象
  if (currentRoot && currentRoot.alternate) { // 偶数次更新 
    workInProgressRoot = currentRoot.alternate
    workInProgressRoot.alternate = currentRoot
    // 可能调度的时候没有传入rootFiber
    if (rootFiber) workInProgressRoot.props = rootFiber.props // props需要是当前的最新值
  } else if (currentRoot) { // 奇数次更新
    if (rootFiber) {
      rootFiber.alternate = currentRoot // 让workInProgress通过alternate关联起来
      workInProgressRoot = rootFiber
    } else {
      workInProgressRoot = {
        ...currentRoot,
        alternate: currentRoot
      }
    }
  } else { // 第一次渲染
    workInProgressRoot = rootFiber
  }
  workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null
  nextUnitOfWork = workInProgressRoot
}

// 开始处理fiber, beginWork主要是创建真实节点
function beginWork(fiber) {
  if (!fiber) return
  const tag = fiber.tag
  if (tag === TAG_ROOT) { // 对根节点进行处理,同时会递归创建子孙的fiber
    updateRoot(fiber)
  } else if (tag === TAG_TEXT) { // 处理文本节点
    updateTextHost(fiber)
  } else if (tag === TAG_HOST) { // 处理原生html元素
    updateHostComponent(fiber)
  } else if (tag === CLASS_COMPONENT) { // 处理类组件
    updateClassComponent(fiber)
  }
}

function updateClassComponent(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = new fiber.type(fiber.props)
    fiber.stateNode.internalFiber = fiber // 让fiber和实例互相引用
    fiber.updateQueue = new UpdateQueue() // 初始化updateQueue
  }
  // 更新state的值
  fiber.stateNode.state = fiber.updateQueue.forceUpdate(fiber.stateNode.state)
  const newChild = fiber.stateNode.render()
  reconcilerChildren(fiber, [newChild])
}

function updateHostComponent(fiber) {
  if (!fiber.stateNode) { // 如果不存在真实节点那就先创建
    fiber.stateNode = createDOM(fiber) // 创建真实元素
  }
  const children = fiber.props.children
  reconcilerChildren(fiber, children) // 为子元素创建fiber
}

function createDOM(fiber) {
  if (fiber.tag === TAG_TEXT) return document.createTextNode(fiber.props.text)
  const type = fiber.type
  const dom = document.createElement(type)
  patchProps(dom, {}, fiber.props) // 更新元素的属性
  fiber.stateNode = dom // 将真实元素进行更新
  return dom
}

// 创建文本节点
function updateTextHost(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDOM(fiber)
  }
}

function updateRoot(fiber) {
  const children = fiber.props.children // 因为是根节点，所以对子节点进行渲染
  reconcilerChildren(fiber, children)
}

// 依次处理当前filber的子节点
function reconcilerChildren(currentFiber, children) {
  let childIndex = 0
  let previousFiber = null
  let oldFiber = currentFiber.alternate && currentFiber.alternate.child
  if (oldFiber) oldFiber.firstEffect = oldFiber.nextEffect = oldFiber.lastEffect = null
  // 只要有一个还没完成那就继续
  while(childIndex < children.length || oldFiber) {
    const child = children[childIndex]
    let tag
    let fiberNode
    if (child && typeof child.type === 'function' && child.type.prototype.isReactComponent) {
      tag = CLASS_COMPONENT
    } else if (child && typeof child.type === 'function') {
      tag = FUNCTION_COMPONENT
    } else if (child && child.type === TEXT) { // 文本节点
      tag = TAG_TEXT
    } else if (child && typeof child.type === 'string') { // 原生html标签
      tag = TAG_HOST
    }
    const isSame = oldFiber && child && oldFiber.type === child.type
    if (isSame) {
      if (false && oldFiber.alternate) { // 如果上上次有fiber的话，直接复用，修改属性即可
        fiberNode = oldFiber.alternate
        fiberNode.props = child.props
        fiberNode.alternate = oldFiber
        fiberNode.effectTag = UPDATE
        fiberNode.child = null // 当前fiber的第一个子节点
        fiberNode.sibling = null // 当前fiber的下一个兄弟节点
        fiberNode.firstEffect = null // 第一个更新操作
        fiberNode.nextEffect = null // 下一个更新
        fiberNode.lastEffect = null // 最后一个更新
      } else {
        // 类型相同直接复用
        fiberNode = {
          tag: oldFiber.tag, // 标记当前是什么类型的fiber
          type: oldFiber.type, // 当前虚拟节点的类型
          props: child.props, // 属性要拿最新的属性
          return: currentFiber, // 当前fiber的父节点
          child: null, // 当前fiber的第一个子节点
          sibling: null, // 当前fiber的下一个兄弟节点
          stateNode: oldFiber.stateNode, // 复用之前的实例
          updateQueue: oldFiber.updateQueue || new UpdateQueue(),
          alternate: oldFiber, // 指向之前的老fiber
          effectTag: UPDATE, // 当前副作用的类型
          firstEffect: null, // 第一个更新操作
          nextEffect: null, // 下一个更新
          lastEffect: null // 最后一个更新
        }
      }
    } else {
      if (child) {
        fiberNode = {
          tag, // 标记当前是什么类型的fiber
          type: child.type, // 当前虚拟节点的类型
          props: child.props, // 属性
          return: currentFiber, // 当前fiber的父节点
          child: null, // 当前fiber的第一个子节点
          sibling: null, // 当前fiber的下一个兄弟节点
          stateNode: null, // 当前fiber的真实dom元素
          updateQueue: new UpdateQueue(),
          effectTag: PLACEMENT, // 当前副作用的类型
          firstEffect: null, // 第一个更新操作
          nextEffect: null, // 下一个更新
          lastEffect: null // 最后一个更新
        }
      }
      if (oldFiber) {
        // 类型不同的话，要删除之前的元素
        oldFiber.effectTag = DELETE
        deletions.push(oldFiber)
      }
    }
    // 如果当前有新fiber,才可以修改指向，有可能老的长度比新的长，所以会出现为undefined的情况
    if (fiberNode) {
      if (childIndex === 0) {
        currentFiber.child = fiberNode // child指向第一个子节点
      } else {
        previousFiber.sibling = fiberNode // 上一个fiber的sibling指向当前的元素
      }
    }
    // 如果当前oldFiber存在就继续取它的下一个兄弟节点
    if (oldFiber) {
      oldFiber = oldFiber.sibling // 移动到下一个元素,同时移动
    }
    previousFiber = fiberNode
    childIndex++
  }
}

// 完成当前节点的处理, complete主要是进行effect的收集
function completeUnitOfWork(currentFiber) {
  const returnFiber = currentFiber.return
  if (returnFiber) {
    // 把当前fiber的有副作用的子节点挂载到父元素上
    if (!returnFiber.firstEffect) { // 父元素不存在第一个副作用元素时，将自己的第一个挂载上去
      returnFiber.firstEffect = currentFiber.firstEffect
    }
    // if (currentFiber.lastEffect) {
    //   if (returnFiber.lastEffect) { // 如果有了最后一个，那么把最后一个指向当前的第一个副作用节点,这样才能保证能把子元素的所有副作用挂载上去
    //     returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
    //   }
    //   returnFiber.lastEffect = currentFiber.lastEffect
    // }

    if (returnFiber.lastEffect) { // 如果有了最后一个，那么把最后一个指向当前的第一个副作用节点,这样才能保证能把子元素的所有副作用挂载上去
      returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
    }
    returnFiber.lastEffect = currentFiber.lastEffect


    const effectTag = currentFiber.effectTag // 取出当前fiber的副作用操作
    if (effectTag) { // 存在副作用操作就更新父节点的链表
      if (!returnFiber.firstEffect) { // 如果父节点还没有第一个更新的话，那么指向自己
        returnFiber.firstEffect = currentFiber
      }
      if (returnFiber.lastEffect) { // 如果存在最后一个副作用fiber,那么将它的下一个指向自己
        returnFiber.lastEffect.nextEffect = currentFiber
      }
      returnFiber.lastEffect = currentFiber // 无论如何，父节点的最后一个副作用指向自己
    }
  }
}

// 处理每个fiber
function performUnitOfWord(fiber) {
  beginWork(fiber)
  if (fiber.child) {
    return fiber.child // 如果当前有孩子就处理孩子
  }
  let current = fiber
  while(current) {
    completeUnitOfWork(current)
    if (current.sibling) return current.sibling // 如果没有儿子那就处理兄弟节点
    current = current.return // 如果当前没有兄弟节点，那么处理父亲的兄弟节点
  }
}

// 将complete收集到的effect进行更新
function commitRoot() {
  // 更新之前先删除需要删除的元素
  deletions.forEach(fiber => commitFiber(fiber))
  let currentFiber = workInProgressRoot.firstEffect
  while(currentFiber) {
    commitFiber(currentFiber)
    currentFiber = currentFiber.nextEffect
  }
  deletions.length = 0 // 清空删除列表
  currentRoot = workInProgressRoot // 赋给current,下次更新的时候可以用到
  workInProgressRoot = null
}
// 提交每一个副作用
function commitFiber(currentFiber) {
  if (!currentFiber) return
  const effectTag = currentFiber.effectTag // 当前副作用的类型
  let returnFiber = currentFiber.return // 拿到父节点
  // 找到真正子元素dom节点
  while(currentFiber.tag !== TAG_TEXT && currentFiber.tag !== TAG_HOST) {
    currentFiber = currentFiber.child
  }
  let currentDom = currentFiber.stateNode // 当前fiber对应的实例

  // 类组件就要继续往上面找到真正的dom节点
  while(returnFiber.tag !== TAG_ROOT && returnFiber.tag !== TAG_HOST) {
    returnFiber = returnFiber.return
  }
  let returnDom = returnFiber.stateNode // 父节点的实例

  if (returnFiber) {
    if (effectTag === PLACEMENT && currentDom) { // 新增
      returnDom.appendChild(currentDom)
    } else if (effectTag === DELETE) {
      returnDom.removeChild(currentDom)
    } else if (effectTag === UPDATE) {
      if (currentFiber.type === TEXT) { // 文本节点单独处理
        if (currentFiber.props.text !== currentFiber.alternate.props.text) {
          currentDom.textContent = currentFiber.props.text
        }
      } else { // 不是文本节点的话，直接打补丁
        patchProps(currentDom, currentFiber.alternate.props, currentFiber.props)
      }
    }
    currentFiber.effectTag = null
  }
}

/**
 * @param {*} deadline 该参数有两个属性
 * deadline.timeRemaining() 代表当前一帧还剩下多少时间没用
 * deadline.didTimeout 你传入的任务是否已经超时
 */
function workLoop(deadline) {
  let shouldYield = false // 是否把控制权还给浏览器
  while (nextUnitOfWork && !shouldYield) { // 如果当前有任务或者不需要还回去，那么执行
    nextUnitOfWork = performUnitOfWord(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfWork && workInProgressRoot) { // 如果没有下一个需要处理的fiber以后,就开始进入到commit阶段，渲染真实的节点
    commitRoot()
  }
  requestIdleCallback(workLoop, { timeout: 500 })
}

// 让浏览器在空闲的时候执行这个任务,最迟500毫秒以后执行
requestIdleCallback(workLoop, { timeout: 500 })