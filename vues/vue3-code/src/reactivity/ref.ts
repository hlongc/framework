import { hasChanged, isObject } from '../shared'
import { track, trigger, TriggerTypes } from './effect'
import { reactive } from './reactive'

// 如果传入的是对象，那么用proxy进行代理
const convert = (value: any): any => isObject(value) ? reactive(value) : value

class RefImpl {
  private readonly __v_isRef = true
  private _shallow = false
  private _value: any
  constructor(private _rawValue: any) {
    this._value = convert(_rawValue)
  }
  get value(): any {
    track(this, 'value')
    return this._value
  }
  set value(newValue) {
    if (hasChanged(newValue, this._value)) { // 值发生变化才触发更新
      this._rawValue = newValue
      this._value = convert(newValue)
      trigger(this, TriggerTypes.SET, 'value', newValue)
    }
  }
}

export function ref(rawValue: any) {
  return new RefImpl(rawValue)
}

class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true
  constructor(private readonly _object: T, private readonly _key: K) {}
  get value(): any {
    return this._object[this._key]
  }
  set value(newValue: any) {
    this._object[this._key] = newValue
  }
}

// toRefs就是代理作用，而且只代理第一层，就是把普通值变成响应式的，避免通过解构失去响应
export function toRefs<T extends object>(target: T) {
  const ret: any = Array.isArray(target) ? new Array(target.length) : {}
  for (const key in target) {
    ret[key] = new ObjectRefImpl(target, key)
  }
  return ret
}