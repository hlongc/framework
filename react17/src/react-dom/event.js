import { updateQueue } from '../react/Component'

/**
 * 给dom绑定对应事件
 * @param {*} dom 绑定事件的dom
 * @param {*} type 事件类型
 * @param {*} handler 事件处理函数
 */
export function addEvent(dom, type, handler) {
  // 保留当前对象的该类型的处理函数
  const events = dom.events || (dom.events = {})
  events[type] = handler
  // react16里面是把事件都绑定到了document上面，react17是绑定到根元素上面(为了解决多个react版本共存引起events事件冲突)
  document.addEventListener(type.replace('on', ''), dispatchEvent)
}

// react使用合成事件有两大好处
// 1、可以对事件做兼容性处理，因为不同浏览器的事件对象实现不同
// 2、可以进行批量更新，控制事件流程
let syntheticEvent = {}
let stopping = false

function dispatchEvent(event) {
  updateQueue.isBatchingUpdate = true // 批量处理事件
  const { target, type } = event // target事件源 type事件类型 click
  updateEvent(event)
  // 事件冒泡
  let source = target
  while(source) {
    const events = source.events
    if (events && events[`on${type}`]) {
      events[`on${type}`].call(null, syntheticEvent)
    }
    // 如果当前阻止事件冒泡就不继续执行了
    if (!stopping) {
      source = source.parentNode
    } else {
      break
    }
  }
  for (const key in syntheticEvent) {
    syntheticEvent[key] = null
  }
  stopping = false
  updateQueue.batchUpdate()
}

function updateEvent(event) {
  for (const key in event) {
    if (typeof event[key] === 'function') {
      // 处理方法 比如stopPropagation
      syntheticEvent[key] = event[key].bind(event)
    } else {
      syntheticEvent[key] = event[key]
    }
  }
  // 持久化事件对象，让他不被销毁
  syntheticEvent.__proto__.persist = function() {
    syntheticEvent = {}
  }
  // 阻止事件冒泡
  syntheticEvent.stopPropagation = function() {
    stopping = true
  }
}