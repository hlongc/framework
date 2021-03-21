import './requestIdleCallback'

function sleep(duration) {
  const now = Date.now()
  while (Date.now() < now + duration) {}
}

const task = [
  () => {
    // sleep(20)
    console.log('第一个')
  },
  () => {
    // sleep(15)
    console.log('第二个')
  },
  () => {
    // sleep(15)
    console.log('第三个')
  }
]

function workLoop(deadLine) {
  console.log('deadLine.timeRemaining', deadLine.timeRemaining())
  if (task.length && (deadLine.timeRemaining() > 0 || deadLine.didTimeout)) {
    console.time('开始执行')
    performUnitOfWork()
    console.timeEnd('开始执行')
  }
  if (task.length) {
    requestIdleCallback(workLoop, { timeout: 1000 })
  }
}

function performUnitOfWork() {
  task.shift()()
}

function start() {
  requestIdleCallback(workLoop, { timeout: 1000 })
}

start()