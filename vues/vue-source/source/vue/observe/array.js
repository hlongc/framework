import { observe } from ".";

// 拦截数组的 push pop unshift shift splice sort reverse 方法，因为这几个方法会修改数组本身

const oldArrayPrototyeMethods = Array.prototype

const methods = ['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse']
// 不修改原型上的方法
export const arrayMethods = Object.create(oldArrayPrototyeMethods)

export function observeArray(list) {
  for (let i = 0; i < list.length; i++) {
    observe(list[i])
  }
}

methods.forEach(method => {
  arrayMethods[method] = function(...args) {
    console.log('拦截到方法', method)
    let increment
    switch (method) {
      case 'push':
      case 'unshift':
       increment = args
       break
      case 'splice':
        increment = args.slice(2) // 获取splice新增的元素
        break
      default:
        break
    }
    if (increment) observeArray(increment) // 对数组新增的值也进行观测，因为新增的有可能是对象
    this.__ob__.dep.notify() // 通知数组发生了变化，更新视图
    return oldArrayPrototyeMethods[method].apply(this, args)
  }
})