import { isFunction, isObject } from '../shared'
import { VNodeProps } from './vnode'

export interface ComponentProps {
  type: any;
  props: object | null;
  vnode: VNodeProps;
  subTree: any;
  render: Function | null; // 因为setup可以返回函数作为渲染函数
  setupState: object | null; // 也可以返回对象作为模板的状态
  isMounted: boolean;
}

/**
 * 为vnode创建并返回实例
 * @param vnode 虚拟节点
 */
export function createComponentInstance(vnode: VNodeProps): ComponentProps {
  // <test></test> 渲染为 <div></div>
  // 那么 test就是vnode, div就是subTree
  return {
    type: vnode.type,
    props: {},
    vnode,
    subTree: null, // 子节点
    render: null, // render函数
    setupState: null, // setup函数返回的状态
    isMounted: false // 是否挂载
  }
}

// 调用setup或者render方法
export function setupComponent(instance: ComponentProps) {
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: ComponentProps) {
  const Component = instance.type
  const { setup } = Component
  if (setup) {
    const ret: Function | object = setup(instance.props)
    handleSetupResult(instance, ret)
  }
}

/**
 * 处理setup函数返回值
 * @param instance 虚拟节点的实例
 * @param ret 返回值
 */
function handleSetupResult(instance: ComponentProps, ret: Function | object) {
  if (isFunction(ret)) { // 返回的是渲染函数
    instance.render = ret
  } else if (isObject(ret)) { // 返回的是状态
    instance.setupState = ret
  } else {
    console.error('setup return type is only function or object')
  }
  finishComponentSetup(instance)
}

function finishComponentSetup (instance: ComponentProps) {
  const Component = instance.type
  // 兼容vue2
  if (Component.render && !instance.render) { // 如果存在render函数并且setup没有返回渲染函数，那就使用这个render函数
    instance.render = Component.render
  } else if (!instance.render) { // 如果还不存在，那就说明是template模板，那就把template解析为render函数
    // template => ast => codegen => render
    console.log('解析template为render函数')
  }
  applyOptions(instance) // 兼容vue2合并属性 computed data ...
}

function applyOptions(instance: ComponentProps) {
  console.log('merge')
}
