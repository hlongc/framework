import { isFunction, isObject, noop } from '../shared'
import { effect, track, trigger, TriggerTypes } from './effect'

interface ComputedOption {
  get: () => any;
  set?: () => void;
}

class ComputedRefImpl {
  public effect: Function
  private readonly __v_isReadonly = true
  private readonly __v_isRef = true
  private _dirty = true
  private _value: any
  constructor(private _setter: Function, getter: Function) {
    this.effect = effect(getter, {
      lazy: true, // 表示当前是计算属性的effect
      scheduler: () => { // 保证this指向当前实例而不是这个对象
        this._dirty = true // 依赖的属性发生了改变
        trigger(this, TriggerTypes.SET, 'value') // 当计算属性依赖的属性发生变化时，需要让计算属性外层的effect重新执行
      }
    })
  }
  set value(value: any) { // 类属性访问器
    this._setter(value)
  }
  get value(): any {
    if (this._dirty) { // 脏检查，如果所依赖的属性发生了改变才执行
      this._value = this.effect() // 执行用户传入的getter函数即可
      track(this, 'value') // 取值的时候，对计算属性外层的effect进行收集
      this._dirty = false
    }
    return this._value
  }
}

export function computed(getterOrOption: Function | ComputedOption) {
  let setter, getter
  // 可以传入函数和对象
  if (isFunction(getterOrOption)) {
    setter = () => { console.error('当前未设置setter,不能设置值') }
    getter = getterOrOption
  } else if (isObject(getterOrOption)) {
    setter = getterOrOption.set || noop
    getter = getterOrOption.get
  } else {
    setter = noop
    getter = noop
  }
  return new ComputedRefImpl(setter, getter)
}