// const element = (
//   <div id="A1">
//     <div id="B1"></div>
//     <div id="B2">
//       <div id="C1"></div>
//       <div id="C2"></div>
//     </div>
//   </div>
// )

const element = {
  type: "div",
  props: {
    id: "A1",
    children: [
      {
        type: "div",
        props: {
          id: "B1",
        },
      },
      {
        type: "div",
        props: {
          id: "B2",
          children: [
            {
              type: "div",
              props: {
                id: "C1",
              },
            },
            {
              type: "div",
              props: {
                id: "C2",
              },
            },
          ],
        },
      },
    ],
  },
};

const PLACEMENT = 'PLACEMENT' // 插入新元素

let workInProgressRoot = {
  stateNode: document.getElementById('root'),
  props: { children: [element] }
}
let workInProgess = workInProgressRoot

// 创建真实dom，但是不挂载
function beginWork(workInProgess) {
  console.log('beginWork', workInProgess.props.id)
  if (!workInProgess.stateNode) {
    workInProgess.stateNode = document.createElement(workInProgess.type)
  }
  const stateNode = workInProgess.stateNode
  const props = workInProgess.props
  // 处理属性
  for (const key in props) {
    if (key === 'children') continue
    stateNode[key] = props[key]
  }
  // 处理孩子节点
  const children = props.children
  if (Array.isArray(children)) {
    let previous
    // 建立父子关系
    children.forEach((child, index) => {
      const fiberNode = {
        type: child.type,
        return: workInProgess,
        props: child.props,
        effectTag: PLACEMENT, // 当前节点更新的类型
        firstEffect: null, // 第一个需要更新的子节点
        lastEffect: null // 最后一个需求更新的子节点
      }
      if (index === 0) {
        workInProgess.child = fiberNode
      } else {
        previous.sibling = fiberNode
      }
      previous = fiberNode
    })
  }
}

// 绑定effect关系
function completeWork(workInProgessFiber) {
  console.log('completeWork', workInProgessFiber.props.id)
  const returnFiber = workInProgessFiber.return
  // 先把子节点的更新放到父节点上
  if (!returnFiber) return
  if (!returnFiber.firstEffect) {
    returnFiber.firstEffect = workInProgessFiber.firstEffect
  }
  if (workInProgessFiber.lastEffect) {
    if (returnFiber.lastEffect) {
      returnFiber.lastEffect.nextEffect = workInProgessFiber.firstEffect
    }
    returnFiber.lastEffect = workInProgessFiber.lastEffect
  }
  // 把自己的更新也挂载上来
  if (workInProgess.effectTag) {
    if (returnFiber.lastEffect) {
      returnFiber.lastEffect.nextEffect = workInProgessFiber
    } else {
      returnFiber.firstEffect = workInProgessFiber
    }
    returnFiber.lastEffect = workInProgessFiber
  }
}

function performUnitOfWork(workInProgess) {
  beginWork(workInProgess)
  if (workInProgess.child) {
    return workInProgess.child
  }
  // 孩子节点都处理了就算完成了
  while (workInProgess) {
    completeWork(workInProgess)
    if (workInProgess.sibling) {
      return workInProgess.sibling
    }
    workInProgess = workInProgess.return
  }
}

// 开始进行挂载操作
function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect
  while(currentFiber) {
    if (currentFiber.effectTag === PLACEMENT) {
      currentFiber.return.stateNode.appendChild(currentFiber.stateNode)
    }
    currentFiber = currentFiber.nextEffect
  }
  workInProgressRoot = null
}

function workLoop(deadLine) {
  while (workInProgess) {
    workInProgess = performUnitOfWork(workInProgess)
  }
  if (!workInProgess) {
    commitRoot()
  }
}

requestIdleCallback(workLoop)