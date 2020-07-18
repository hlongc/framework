import { isObject, hasOwnProperty, hasChanged } from "../shared/utils";
import { reactive } from "./reactive";
import { trigger, track } from "./effect";
import { TriggerType, TrackType } from "./constant";

const set = createSetter()

const get = createGetter()

function createSetter() {
  return function(target, key, value, receiver) {
    const oldValue = target[key] // 没修改之前的值
    const hasKey = hasOwnProperty(target, key)
    const r = Reflect.set(target, key, value, receiver)
    // 设置的时候，触发该属性绑定的effect函数
    if (!hasKey) {
      trigger(target, TriggerType.ADD, key, value)
    } else if (hasChanged(oldValue, value)) {
      trigger(target, TriggerType.SET, key, value)
    }
    return r
  }
}

function createGetter() {
  return function(target, key) {
    const r = Reflect.get(target, key)
    track(target, TrackType.GET, key) // 取值的时候进行依赖收集
    
    if (isObject(r)) {
      return reactive(r)
    }
    return r
  }
}

export const mutableHandler = {
  set,
  get
}