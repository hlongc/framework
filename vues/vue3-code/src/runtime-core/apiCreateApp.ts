import { createVNode } from './vnode'

export function createAppApi(renderer: Function) {
  return function(rootComponent: any) {
    const app = {
      mount(rootEl: HTMLElement | string) {
        const vnode = createVNode(rootComponent) // 通过组件创建虚拟节点
        renderer(vnode, rootEl) // 把虚拟节点渲染到真实dom上
      }
    }
    return app
  }
}