import Observer from './observer'
import Watcher from './watcher'
import Dep from './dep'

export function initState(vm) {
  // 初始化不同的选项
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

export function observe(data) {
  if (typeof data !== 'object' || data === null) {
    return
  }
  if (data.__ob__) return data.__data__ // 如果已经观测过了，则直接返回
  return new Observer(data)
}

// 代理到vm上面，可以直接通过vm取到data里面的值
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}

function initData(vm) { // 将用户传入的data用Object.defineProperty进行重新定义
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  for (let key in data) { // 把data中的值代理到vm实例上
    proxy(vm, '_data', key)
  }
  observe(vm._data)
}

function createComputed(vm, key) {
  const watcher = vm._computedWatcher[key]
  return () => { // 用户取值会执行这个方法
    if (watcher) {
      if (watcher.dirty) { // 如果页面取值这个是true，则会调用这个方法更新值
        watcher.evluate()
      }
      if (Dep.target) { // 如果当前有渲染watcher，则把渲染watch也存到计算属性依赖的值里面，这样当属性刷新时会调用渲染watcher刷新页面
        watcher.depend()
      }
      return watcher.oldValue
    }
  }
}

function initComputed(vm) {
  const computeds = vm.$options.computed
  // 定义到实例上
  const _computeds = vm._computedWatcher = Object.create(null)
  for (const key in computeds) {
    const handler = computeds[key]
    // 记录每一个computed计算函数，创建watcher
    _computeds[key] = new Watcher(vm, handler,() => {}, { lazy: true })
    // 给vm定义这个计算属性
    Object.defineProperty(vm , key, {
      get: createComputed(vm, key)
    })
  }
}

function createWachter(vm, key, fn, options) {
  return vm.$watch(key, fn, options)
}

function initWatch(vm) {
  const watches = vm.$options.watch
  for (const key in watches) {
    const options = {}
    let handler = watches[key]
    if (typeof handler === 'object') {
      handler = handler.handler
      options.immediate = true
    }
    createWachter(vm, key, handler, options)
  }
}