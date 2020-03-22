import { popWatcher, pushWatcher } from "./dep";

let id = 0 // 每次产生的watcher独一无二，有个唯一标志符id
class Watcher{
  /**
   * 
   * @param {*} vm 当前组件实例
   * @param {*} exprOrFn 用户传入的表达式,有可能是表达式 msg，也有可能是function
   * @param {*} cb 用户传入的回调 vm.$watch('msg', () => {})
   * @param {*} options 配置项
   */
  constructor(vm, exprOrFn, cb = () => {}, options = {}) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    this.deps = [] // 依赖当前wacther的dep
    this.depId = new Set() // 记录依赖当前wacther的dep的ID
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    } else {
      // 如果是表达式，则去取值，从而主动触发收集
      this.getter = function() {
        return vm[exprOrFn]
      }
    }
    this.user = options.user // 是否为用户自定义的wacth
    this.cb = cb
    this.options = options
    this.id = ++id

    this.oldValue = this.get() // 记录老值
  }
  get() {
    pushWatcher(this) // 第一次是渲染watcher
    const value = this.getter()
    popWatcher() // 为了下次使用，要删除
    return value
  }
  update() { // 调用get方法调用getter来重新渲染页面
    queueWachter(this)
  }
  run() {
    // 更新的时候比较老值和新值是否相同
    const newValue = this.get()
    if (newValue !== this.oldValue) {
      this.cb(newValue, this.oldValue) // 触发用户自定义的watch方法，并传入新值和老值
      // 更新老值
      this.oldValue = newValue
    }
  }
  addDep(dep) {
    if (!this.depId.has(dep.id)) { // 因为dep的id是不重复的
      this.depId.add(dep.id)
      this.deps.push(dep)
      dep.addSub(this) // 让dep记住当前的watcher
    }
  }
}

const watcherId = new Set()
const queue = []

function flushCallback() {
  queue.forEach(watcher => watcher.run())
  watcherId.clear()
  queue.length = 0
}

function queueWachter(wacther) {
  if (!watcherId.has(wacther.id)) {
    watcherId.add(wacther.id)
    queue.push(wacther)
    nextTick(flushCallback)
  }
}

export function nextTick(cb) {
  // 微任务优先级最高 优先级由高到低
  if (Promise) {
    Promise.resolve().then(cb)
  } else if (setImmediate) {
    setImmediate(cb)
  } else if (MutationObserver) {
    const observe = new MutationObserver(cb)
    const node = document.createElement('div')
    observe.observe(node, { subtree: true, childList: true })
    node.appendChild(document.createElement('p'))
  } else if (MessageChannel) {
    const channel = new MessageChannel()
    const port1 = channel.port1
    const port2 = channel.port2
    port1.onmessage = cb
    port2.postMessage(1)
  } else {
    setTimeout(() => {
      cb()
    }, 0)
  }
}

// 渲染 computed watch都是用这个Watcher实现 
export default Watcher