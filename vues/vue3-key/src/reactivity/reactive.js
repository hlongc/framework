import { isObject } from "../shared/utils";
import { mutableHandler } from "./baseHandlers";

export function reactive(target) {
  return createReactiveObject(target, mutableHandler)
}

function createReactiveObject(target, handler) {
  if (!isObject(target)) return target
  const proxy = new Proxy(target, handler)
  return proxy
}