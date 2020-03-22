import Observer from './observer'

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

function initComputed() {

}

function createWachter(vm, key, fn) {
  return vm.$watch(key, fn)
}

function initWatch(vm) {
  const watches = vm.$options.watch
  for (const key in watches) {
    createWachter(vm, key, watches[key])
  }
}