import { createVNode } from './vnode'

export function h(type: any, props = {}, children = null) {
  return createVNode(type, props, children)
}