
class EventEmitter {
  constructor() {
    this.callbacks = {}
  }
  on(type, cb) {
    if (type !== 'newListener') {
      const newListenerCbs = this.callbacks['newListener']
      if (newListenerCbs) {
        newListenerCbs.forEach(fn => fn(type))
      }
    }
    if (!this.callbacks[type]) {
      this.callbacks[type] = []
    }
    this.callbacks[type].push(cb)
  }
  once(type, cb) {
    // 因为只执行一次，所以执行完成以后要自动卸载事件
    const wrapper = (...args) => {
      cb(...args)
      this.off(type, wrapper)
    }
    this.on(type, wrapper)
  }
  off(type, cb) {
    // 什么都不传，卸载所有注册的事件
    if (type === undefined) {
      this.callbacks = {}
      return
    }
    // 只传了事件类型，那就卸载当前名字下的事件
    if (type && typeof cb !== 'function') {
      this.callbacks[type] = []
      return
    }
    // 如果都传了，那就卸载指定事件
    if (this.callbacks[type]) {
      this.callbacks[type] = this.callbacks[type].filter(fn => fn !== cb)
    }
  }
  emit(type, ...args) {
    const cbs = this.callbacks[type]
    if (cbs) {
      cbs.forEach(cb => cb(...args))
    }
  }
}

const e = new EventEmitter()
e.on('newListener', type => {
  console.log(type)
})

function handler(...args) {
  console.log('on', ...args)
}

e.once('test', (...args) => {
  console.log('once', ...args)
})
e.on('test', handler)
console.log(e.callbacks)
e.emit('test', 6, 7, 8)
console.log(e.callbacks)
e.emit('test', 1, 2, 3)