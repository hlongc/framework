class Component {
  constructor() {
    this.state = { name: 'hlc', num: 0 }
    this.updateList = []
    this.callbackList = []
    this.batchUpdate = false
  }
  setState(partialState, cb) {
    if (this.batchUpdate) { // 批量更新先保存
      this.updateList.push(partialState)
      cb && this.callbackList.push(cb)
    } else { // 不是批量更新的话，立即更新
      partialState = typeof partialState === 'function' ? partialState(this.state) : partialState
      this.state = { ...this.state, ...partialState }
      cb && cb()
    }
  }
  flushUpdate() {
    let state = this.state
    this.updateList.forEach(fn => {
      const partialState = typeof fn === 'function' ? fn(state) : fn
      state = { ...state, ...partialState }
    })
    this.state = state
    this.callbackList.forEach(cb => cb())
    this.batchUpdate = false
  }
  add() {
    setTimeout(() => {
      this.setState(prevState => ({ num: prevState.num + 1 }))
      this.setState(prevState => ({ num: prevState.num + 2 }))
      console.log(this.state)
    })
    // this.batchUpdate = true

    // this.setState(prevState => ({ num: prevState.num + 1 }), () => {
    //   console.log(this.state)
    // })
    // this.setState(prevState => ({ num: prevState.num + 2 }), () => {
    //   console.log(this.state)
    // })
    // this.setState(prevState => ({ num: prevState.num + 3 }), () => {
    //   console.log(this.state)
    // })

    // this.flushUpdate()
  }
}

const c = new Component
c.add()