import { observe } from './index'
import { arrayMethods, observeArray } from './array'
import Dep from './dep'

export function defineReactive(obj, key, value) { // 定义响应式数据
  observe(value) // 继续观测value,因为value有可能还是一个对象
  // 同一个属性是同一个dep
  const dep = new Dep()
  // Object.defineProperty这个方法不兼容ie9以下，所以vue不兼容ie9以下
  Object.defineProperty(obj, key, {
    get() {
      // 因为第一次页面渲染的时候new Watcher了，调用的getter()方法时pushWachter了，所以是一定存在target的
      if (Dep.target) {
        dep.depend()
      }
      return value
    },
    set(newValue) {
      if (newValue === value) return
      observe(newValue) // 对新设置的值也进行观测
      value = newValue
      dep.notify() // 当属性值变化时发布，让watcher的update方法都执行
    }
  })
}

class Observer{
  constructor(data) {
    if (Array.isArray(data)) {
      // 数组进行单独拦截,修改原型链
      data.__proto__ = arrayMethods
      observeArray(data) // 观测数组的每一项 
    } else {
      this.walk(data)
    }
  }
  walk(data) {
    const keys = Object.keys(data)
    // 遍历每个值进行观测
    for (let i = 0 ; i < keys.length; i++) {
      const key = keys[i]
      const value = data[key]
      defineReactive(data, key, value)
    }
  }
}

export default Observer