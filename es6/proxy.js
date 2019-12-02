// vue 3.0响应式原理

const toProxy = new WeakMap
const toRow = new WeakMap

function isObject(target) {
  return target !== null && typeof target === 'object'
}

function hasProperty(target, key) {
  return target.hasOwnProperty(key)
}

function reactive(target) {
  if (!isObject(target)) return target
  if (a = toProxy.get(target)) return a // 如果之前已经代理过了，则直接返回
  if (b = toRow.has(target)) return target // 如果当前是代理过的对象再次代理，则直接返回
  const handler = {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      // 依赖收集 订阅
      track(target, key)
      // 如果返回值对象，则继续递归
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      const isExist = hasProperty(target, key)
      const oldValue = target[key]
      const res = Reflect.set(target, key, value, receiver)
      if (!isExist) {
        trigger(target, key, 'add')
      } else if (oldValue !== value) { // 如果新值和老值一样就不用修改了
        trigger(target, key, 'modify')
      }
      return res
    },
    deleteProperty(target, key) {
      return Reflect.deleteProperty(target, key)
    }
  }
  const observed = new Proxy(target, handler)
  toProxy.set(target, observed)
  toRow.set(observed, target)
  return observed
}

function effect(fn) {
  const effectFn = createReactiveEffect(fn)
  effectFn()
}

const reativeEffctStack = []
const targetMap = new WeakMap // 数据结构如下
/**
 * {
 *  target: {
 *   key: [effect, effect]
 * }
}
 */
function track(target, key) {
  let effect = reativeEffctStack[reativeEffctStack.length - 1]
  if (effect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map)
    }
    let depsSet = depsMap.get(key)
    if (!depsSet) {
      depsMap.set(key, depsSet = new Set)
    }
    if (!depsSet.has(effect)) {
      depsSet.add(effect)
    }
  }
}

function trigger(target, key, type) {
  const depMap = targetMap.get(target)
  if (depMap) {
    const depSet = depMap.get(key)
    if (depSet) {
      depSet.forEach(fn => {
        fn()
      })
    }
  }
}

function run(effect, fn) {
  try {
    reativeEffctStack.push(effect)
    fn()
  } finally {
    reativeEffctStack.pop()
  }
}

function createReactiveEffect(fn) {
  const effect = function() {
    return run(effect, fn)
  }
  return effect
}

const obj = reactive({ name: 'hlc' })
effect(() => {
  console.log(obj.name)
})
obj.name = 'hulongchao'
obj.name = 'hulongchao1'

// const arr = [1, 2, 3]
// const arrProxy = reactive(arr)
// arrProxy.push(4)

// const obj = { name: 'hlc', age: 24, info: { hobby: 'game' } }
// const proxy = reactive(obj)
// proxy.info.hobby = 'movie'
// console.log(proxy)