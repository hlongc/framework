export function effect(fn: Function) {
  const effect = createReactiveEffect(fn)
  effect()
}

interface SelfFunction extends Function {
  id?: number;
}

export const effectStack: Function[] = []
export let activeEffect: SelfFunction | null = null
let id = 0

function createReactiveEffect(fn: Function):Function {
  const effect = function reactiveEffect() {
    // 不存在才放进去,比如下面的代码会产生死循环,数据更新执行effect又更新。。。
    // effect(() => {
    //   data.age++
    // })
    if (!effectStack.includes(effect)) { // 不存在才放进去
      try {
        effectStack.push(effect) // 执行之前保存在栈中
        activeEffect = effect // 记录当前的effect，进行关联
        activeEffect.id = id++
        return fn()
      } finally { // 执行完成以后出栈并且解除关联
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  return effect
}
// 保存对象和effect的关系
const effectMap = new WeakMap
// {
//   [target]: {
//     [key]: Set
//   }
// }

// 依赖收集
export function track(target: object, key: string | symbol) {
  // 不存在就不用跟踪了，比如只是简单的取值
  if (activeEffect) {
    let depsMap = effectMap.get(target)
    if (!depsMap) {
      effectMap.set(target, (depsMap = new Map))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set))
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect)
    }
  }
}

export const enum Types {
  ADD,
  SET
}

const run = (effects: Set<Function>) => {
  console.log('run')
  if (effects) {
    effects.forEach(fn => fn())
  }
}

// 触发之前收集的effect
export function trigger(target: object, type: Types, key: string | symbol, value: unknown) {
  const depsMap = effectMap.get(target)
  if (!depsMap) return
  if (Array.isArray(target) && key === 'length') {
    depsMap.forEach((set: Set<Function>, k: string) => {
      // 1、如果当前是数组，并且修改了数组长度那就要更新；
      // 2、如果当前长度小于了取值时的索引，也要更新
      if (k === 'length' || parseInt(k) >= (value as number)) {
        run(set)
      }
    })
    return // 不重复执行下面的修改逻辑
  }

  // 不管是添加还是修改都改变了
  if (key) {
    const effects = depsMap.get(key)
    run(effects)
  }

  switch (type) {
    case Types.ADD:
      // 如果修改数组的索引，那也要进行更新
      if (Array.isArray(target) && parseInt(key as string) + '' === key) {
        // 触发length的依赖
        run(depsMap.get('length'))
      }
      break
    case Types.SET:
      break
  }
}