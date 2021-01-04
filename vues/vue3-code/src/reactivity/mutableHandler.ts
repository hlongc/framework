import { hasChanged, hasOwn, isObject } from '../shared'
import { effectStack } from './effect'
import { reactive } from './reactive'
import { track, trigger, Types } from './effect'

export const mutableHandler = {
  get(target: object, key: string | symbol, recevier: object): any {
    const ret = Reflect.get(target, key, recevier)
    if (typeof key !== 'symbol') { // 屏蔽 Symbol(Symbol.toPrimitive)
      track(target, key)
    }
    return isObject(ret) ? reactive(ret) : ret // 当取值返回的是对象是再继续代理
  },
  set(target: object, key: string | symbol, value: any, recevier: object) {
    const oldValue = (target as any)[key]
    // 如果是数组，就比较当前新增的属性是否比长度大，大的话就是以前不存在的，即为新增的
    const hasKey = Array.isArray(target) && (parseInt(key as string) + '' === key) ? Number(key) < target.length : hasOwn(target, key)
    // 数组push时，先增加新值，然后自动修改length，所以屏蔽重复的length修改
    const ret = Reflect.set(target, key, value, recevier)
    if (!hasKey) {
      trigger(target, Types.ADD, key, value) // 新增
    } else if (hasChanged(oldValue, value)) {
      trigger(target, Types.SET, key, value) // 修改
    }
    effectStack.forEach(effect => effect())
    return ret
  }
}