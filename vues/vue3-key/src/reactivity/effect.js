import { TriggerType } from "./constant";

export function effect(fn, options = {}) {
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) { // 如果不是计算属性，那么默认一开始就执行一次
    effect()
  }
  return effect
}

let activeEffect // 当前正在执行的effect
const effectStack = [] // 把所有的effect放到栈里面
let uid = 0
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(fn)) { // 防止在effect中对状态进行了修改，引起死循环
      try {
        effectStack.push(effect) // 放到栈里面
        activeEffect = effect
        return fn()
      } finally {
        effectStack.pop() // 执行完成,推出栈
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.options = options
  effect.deps = []
  effect.id = uid++
  return effect
}

const targetWeakMap = new WeakMap

/**
 构建WeakMap结构
 {
   {name:'hlc', age: 24}: {
     name: Set(fn1, fn2, fn3),
     age: Set(fn4)
   }
 }
 */

export function track(target, type, key) {
  if (!activeEffect) return // 如果不存在当前执行的effect，说明不是在effect内部触发的
  let targetMap = targetWeakMap.get(target)
  if (!targetMap) {
    targetWeakMap.set(target, (targetMap = new Map))
  }
  let keySet = targetMap.get(key)
  if (!keySet) {
    targetMap.set(key, (keySet = new Set))
  }
  
  if (!keySet.has(activeEffect)) {
    keySet.add(activeEffect)
    activeEffect.deps.push(target)
  }
}

export function trigger(target, type, key, value) {
  const targetMap = targetWeakMap.get(target)
  if (!targetMap) return // 当前对象没有effect依赖它

  // 可能一个属性被多个effect依赖，比如computed，可能计算属性会被effect，所以计算属性的effect要优先执行才能拿到最新值

  const normalEffects = new Set // 普通的effect
  const computedEffects = new Set // 计算属性的effect

  // 不同类型分开存储
  const add = effectSet => {
    if (effectSet) {
      effectSet.forEach(effect => {
        if (effect.options.computed) {
          computedEffects.add(effect)
        } else {
          normalEffects.add(effect)
        }
      })
    }
  }
  // key对应的effectSet保存到set中
  if (key !== null) {
    add(targetMap.get(key))
  }
  // 对数组新增元素也进行监控,数组新增元素时，会对length属性进行依赖收集
  if (type === TriggerType.ADD && Array.isArray(target)) {
    add(targetMap.get('length'))
  }

  const run = effect => {
    if (effect.options.scheduler) { // 计算属性执行scheduler改变dirty值使其重新进行计算
      effect.options.scheduler()
    } else {
      effect()
    }
  }
  // 先执行computed依赖的effectSet，后执行普通的
  computedEffects.forEach(run)
  normalEffects.forEach(run)
}