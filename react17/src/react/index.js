import Component from './Component'
import { wrapVNode } from '../shared/utils'

/**
 * 创建虚拟dom
 * @param {*} type 元素类型
 * @param {*} config 属性
 * @param {*} children 孩子节点
 */
function createElement(type, config, children) {
  let key, ref
  if (config) {
    key = config.key
    ref = config.ref || null
    delete config.__self
    delete config.__source
    delete config.key
    delete config.ref
  }
  const props = { ...config }
  if (children !== null || children !== undefined) {
    props.children = arguments.length > 3 ? [].slice.call(arguments, 2).map(wrapVNode) : wrapVNode(children)  
  } else {
    props.children = null
  }
  return {
    type,
    props,
    key,
    ref
  }
}

function createRef() {
  return { current: null }
}

const React = {
  createElement,
  Component,
  createRef
}

export {
  Component,
  createRef
}

export default React