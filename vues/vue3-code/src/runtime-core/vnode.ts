import { isArray, isObject, isString } from '../shared'
import { ShapeFlags } from '../shared/shapeFlags'

export interface VNodeProps {
  type?: any;
  props?: object | null;
  children: VNodeProps[] | null | string;
  key?: string;
  component?: any;
  el: HTMLElement | null;
  shapeFlag: number;
}

/**
 * 创建并返回vnode
 * @param type 元素类型 div、Component...
 * @param props 属性
 * @param children 子元素
 */
export function createVNode(type: string | Function, props = {} as any, children = null) {
  // 确定组件类型
  const shapeFlag = isString(type) ? ShapeFlags.ELEMENT
    : isObject(type) ? ShapeFlags.STATEFUL_COMPONENT
    : 0
  
  props = props || {}
  const vnode = {
    type,
    props,
    children,
    key: props.key, // 用于diff
    component: null, // 组件的实例
    el: null, // 渲染出来的真实dom
    shapeFlag
  }
  if (isArray(children)) { // 孩子是数组
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  } else { // 文本节点
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  }
  return vnode
}