import { TAG_ROOT, TAG_HOST, TAG_TEXT, TEXT, PLACEMENT } from '../react/constant'
import { patchProps } from './utils'

let workInProgressRoot = null // 根fiber
let nextUnitOfWork = null // 当前正在执行的fiber
// 进行调度
export function schedule(rootFiber) {
  workInProgressRoot = rootFiber
  nextUnitOfWork = workInProgressRoot
}

// 开始处理fiber, beginWork主要是创建真实节点
function beginWork(fiber) {
  if (!fiber) return
  if (fiber.tag === TAG_ROOT) { // 对根节点进行处理,同时会递归创建子孙的fiber
    updateHoot(fiber)
  } else if (fiber.tag === TAG_TEXT) { // 处理文本节点
    updateTextHost(fiber)
  } else if (fiber.tag === TAG_HOST) { // 处理原生html元素
    updateHostComponent(fiber)
  }
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

function updateHoot(fiber) {
  const children = fiber.props.children // 因为是根节点，所以对子节点进行渲染
  reconcilerChildren(fiber, children)
}

// 依次处理当前filber的子节点
function reconcilerChildren(currentFiber, children) {
  let childIndex = 0
  let previousFiber = null
  while(childIndex < children.length) {
    const child = children[childIndex]
    let tag
    if (child && child.type === TEXT) { // 文本节点
      tag = TAG_TEXT
    } else if (child && typeof child.type === 'string') { // 原生html标签
      tag = TAG_HOST
    }
    const fiberNode = {
      tag, // 标记当前是什么类型的fiber
      type: child.type, // 当前虚拟节点的类型
      props: child.props, // 属性
      return: currentFiber, // 当前fiber的父节点
      child: null, // 当前fiber的第一个子节点
      sibling: null, // 当前fiber的下一个兄弟节点
      stateNode: null, // 当前fiber的真实dom元素
      effectTag: PLACEMENT, // 当前副作用的类型
      firstEffect: null, // 第一个更新操作
      nextEffect: null, // 下一个更新
      lastEffect: null // 最后一个更新
    }
    if (childIndex === 0) {
      currentFiber.child = fiberNode // child指向第一个子节点
    } else {
      previousFiber.sibling = fiberNode // 上一个fiber的sibling指向当前的元素
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
  let currentFiber = workInProgressRoot.firstEffect
  while(currentFiber) {
    commitFiber(currentFiber)
    currentFiber = currentFiber.nextEffect
  }
  workInProgressRoot = null
}
// 提交每一个副作用
function commitFiber(currentFiber) {
  if (!currentFiber) return
  const returnFiber = currentFiber.return // 拿到父节点
  if (returnFiber) {
    if (currentFiber.effectTag === PLACEMENT && currentFiber.stateNode) { // 新增
      returnFiber.stateNode.appendChild(currentFiber.stateNode)
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