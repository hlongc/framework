export class Update {
  constructor(payload) {
    this.payload = payload
  }
}

export class UpdateQueue {
  constructor() {
    this.firstUpdate = null
    this.lastUpdate = null
  }
  enqueue(update) {
    if (!this.lastUpdate) {
      this.firstUpdate = this.lastUpdate = update
    } else {
      this.lastUpdate.nextUpdate = update
      this.lastUpdate = update
    }
  }
  forceUpdate(state) {
    let currentUpdate = this.firstUpdate
    while (currentUpdate) {
      // 获取新的状态
      const partialState = typeof currentUpdate.payload === 'function' ? currentUpdate.payload(state) : currentUpdate.payload
      // 进行合并
      state = { ...state, ...partialState }
      currentUpdate = currentUpdate.nextUpdate
    }
    // 执行完以后清空
    this.firstUpdate = this.lastUpdate = null
    return state
  }
 }