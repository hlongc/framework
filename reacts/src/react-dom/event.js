import { updateQueue } from '../react/component'

let syntheticEvent // 全局使用同一个合成事件对象，一般情况使用之后马上重置所有属性
export function handleEvent(dom, eventName, listener) {
  eventName = eventName.slice(2).toLowerCase() // 把事件名称转换为小写 onClick => click
  const eventMap = dom.eventMap || (dom.eventMap = {}) // 获取元素上绑定的事件集合
  eventMap[eventName] = listener // 给当前事件类型赋值，会覆盖之前的同类型事件
  document.addEventListener(eventName, dispatchEvent, false) // 采用事件冒泡, true为事件捕获
}

function persist() {
  // 持久化的思路就是将syntheticEvent指向一个新的对象，后面清除属性就是清除的当前的新的，而之前的不会被清除
  syntheticEvent = {}
}

// 更新当前syntheticEvent合成事件对象属性
function updateSyntheticEvent(e) {
  if (!syntheticEvent) { // 第一次进来没有就创建新的
    syntheticEvent = {}
  }
  // syntheticEvent.__proto__.persist = persist
  Object.defineProperty(syntheticEvent, 'persist', {
    enumerable: false,
    value: persist
  })
  syntheticEvent.nativeEvent = e
  syntheticEvent.currentTarget = e.target
  for (const key in e) {
    if (typeof key === 'function') {
      syntheticEvent[key] = e[key].bind(e)
    } else {
      syntheticEvent[key] = e[key]
    }
  }
}

function dispatchEvent(e) {
  const { type, target } = e
  updateSyntheticEvent(e) // 更新合成事件对象
  let current = target
  // 事件执行之前改成批量更新模式
  updateQueue.isPending = true
  while (current) {
    // 最顶级的app元素没有eventMap属性，需要判断一下
    if (current.eventMap && current.eventMap[type]) { // 如果当前元素绑定了此类型的事件，就让它执行并传入合成事件对象
      current.eventMap[type].call(e, syntheticEvent)
    }
    current = current.parentNode // 事件冒泡
  }
  // 执行完毕以后重置事件对象
  for (const key in syntheticEvent) {
    if (syntheticEvent.hasOwnProperty(key)) {
      syntheticEvent[key] = null
    }
  }
  // 事件执行结束之后改成非批量更新模式
  updateQueue.isPending = false
  // 并且执行批量更新队列里面的方法
  updateQueue.batchUpdate()
}