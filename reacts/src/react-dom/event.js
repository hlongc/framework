import { updateQueue } from '../react/component'

let syntheticEvent // 全局使用同一个合成事件对象，一般情况使用之后马上重置所有属性
export function handleEvent(dom, eventName, listener) {
  eventName = eventName.slice(2).toLowerCase() // 把事件名称转换为小写
  const eventMap = dom.eventMap || (dom.eventMap = {}) // 获取元素上绑定的事件集合
  eventMap[eventName] = listener
  document.addEventListener(eventName, dispatchEvent, false) // 采用事件冒泡, true为事件捕获
}

class SyntheticEvent{
  constructor(nativeEvent) {
    this.nativeEvent = nativeEvent
  }
  persist() { // 把合成事件对象指向一个新的对象上，老对象可以继续引用，在重置的时候，是重置这个新对象
    syntheticEvent = { persist: this.persist.bind(this) }
  }
}

function dispatchEvent(e) {
  const { type, target } = e
  if (!syntheticEvent) {
    syntheticEvent = new SyntheticEvent(e)
  }
  syntheticEvent.nativeEvent = e
  syntheticEvent.currentTarget = target
  for (const key in e) {
    if (typeof key === 'function') {
      syntheticEvent[key] = e[key].bind(e)
    } else {
      syntheticEvent[key] = e[key]
    }
  }
  let current = target
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
    syntheticEvent[key] = null
  }
  updateQueue.isPending = false
}