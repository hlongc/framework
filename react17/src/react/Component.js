import { createDom } from '../react-dom'

export const updateQueue = {
  isBatchingUpdate: false, // 当前是否正在批量更新
  updater: new Set(), // 待处理的更新
  batchUpdate() {
    for (const updater of this.updater) {
      updater.updateClassComponent()
    }
    this.isBatchingUpdate = false
  }
}

class Updater {
  constructor(instance) {
    this.instance = instance // 当前组件实例
    this.pendingState = []
    this.callbacks = []
  }
  addState(partialState, callback) {
    if (typeof callback === 'function') {
      this.callbacks.push(callback)
    }
    this.pendingState.push(partialState)
    if (updateQueue.isBatchingUpdate) { // 如果当前正在批量更新，那直接放到队列即可
      updateQueue.updater.add(this)
    } else { // 如果没有，那么进行强制更新
      this.updateClassComponent()
    }
  }

  updateClassComponent() {
    const { instance, pendingState, callbacks } = this
    if (pendingState.length) {
      instance.state = this.getState() // 更新为最新的状态
      instance.forceUpdate() // 强制更新
      callbacks.forEach(cb => cb()) // 等状态更新完成以后统一执行回调
      callbacks.length = 0
    }
  }

  getState() {
    const { instance, pendingState } = this
    const { state } = instance
    let newState = {}

    pendingState.forEach(nextState => {
      if (typeof next === 'function') { // 处理nextState为函数的情况
        const ret = nextState(state)
        if (typeof ret === 'object') {
          nextState = ret
        }
      }
      newState = { ...state, ...nextState }
    })
    pendingState.length = 0 
    return newState
  }
}
class Component {
  static isReactComponent = true
  constructor(props) {
    this.props = props
    this.updater = new Updater(this)
  }

  setState(partialState, callback) {
    // 让更新器处理逻辑
    this.updater.addState(partialState, callback)
  }

  forceUpdate() {
    const newVnode = this.render()
    const oldDom = this.dom
    const newDom = createDom(newVnode)
    oldDom.parentNode.replaceChild(newDom, oldDom)
    this.dom = newDom
  }

  render() {
    throw new Error('该方法需要子类实现')
  }
}

export {
  Component
}

export default Component