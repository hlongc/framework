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