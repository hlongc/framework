import { isObject } from '../shared'
import { mutableHandler } from './mutableHandler'
import type { HandlerType } from './types'

const reactiveMap = new WeakMap // 保存代理对象和代理以后的对象的映射关系

export function reactive(data: object) {
  return createReactiveObject(data, mutableHandler)
}

function createReactiveObject(target: object, baseHandler: ProxyHandler<HandlerType>) {
  if (!isObject(target)) { // 不是对象就直接返回，不用处理
    return target
  }
  if (reactiveMap.has(target)) { // 代理过了也不需要再次代理
    return reactiveMap.get(target)
  }
  const proxy = new Proxy(target, baseHandler)
  reactiveMap.set(target, proxy) // 保存代理前和代理后的关系
  return proxy
}