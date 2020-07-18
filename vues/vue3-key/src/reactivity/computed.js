import { isFunction } from "../shared/utils";
import { effect, track, trigger } from "./effect";
import { TrackType, TriggerType } from "./constant";

export function computed(fnOrObject) {
  let getter
  let setter
  let dirty = true
  let computed
  // 根据传入类型来获取getter setter
  if (isFunction(fnOrObject)) {
    getter = fnOrObject
    setter = () => {}
  } else {
    getter = fnOrObject.get
    setter = fnOrObject.set
  }

  // computed实现依然是基于effect
  const runner = effect(getter, {
    lazy: true, // 懒加载，第一次不执行
    computed: true,
    scheduler: () => {
      if (!dirty) {
        dirty = true
        trigger(computed, TriggerType.SET, 'value') // 让该computed被依赖的effect执行
      }
    }
  })
  let value
  computed = {
    get value() {
      if (dirty) {
        value = runner() // 每次进行取值的时候，就会执行传入的getter并且把dirty置为false
        dirty = false
        track(computed, TrackType.GET, 'value') // 这里要对value进行依赖收集，否则不会触发相关的effect执行
      }
      return value
    },
    set value(newValue) {
      setter(newValue)
    }
  }

  return computed
}