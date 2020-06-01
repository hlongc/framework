class Events {
  constructor() {
    this.callbacks = {}
  }
  on(eventName, cb) {
    if (eventName !== 'newListener') {
      this.callbacks['newListener'].forEach(fn => fn(eventName))
    }
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = []
    }
    this.callbacks[eventName].push(cb)
  }
  once(eventName, cb) {
    // 只执行一次就是对函数进行切片，执行完毕以后直接删除
    const one = (...args) => {
      cb(...args)
      this.off(eventName, one)
    }
    one.cb = cb // 记录当前这个切片函数对应真实的回调函数，删除时也会根据这个来删除
    this.on(eventName, one)
  }
  off(eventName, cb) {
    if (!this.callbacks[eventName]) {
      return false
    }
    this.callbacks[eventName] = this.callbacks[eventName].filter(fn => fn !== cb && fn.cb !== cb)
  }
  emit(eventName, ...args) {
    if (this.callbacks[eventName]) {
      this.callbacks[eventName].forEach(cb => cb(...args))
    }
  }
}

module.exports = Events