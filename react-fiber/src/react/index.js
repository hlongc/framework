import { TEXT } from './constant'
import { Update } from './updateQueue'
import { schedule, useReducer, useState } from '../react-dom/schedule';
function createElement(type, props, ...children) {
  delete props.__self
  delete props.__source
  children = children.map(child => {
    if (typeof child === 'object' || typeof child === 'function') {
      return child
    } else {
      return { type: TEXT, props: { text: child, children: [] } }
    }
  })
  return { type, props: { ...props, children } }
}

class Component {
  constructor(props) {
    this.props = props
  }
  setState(partial) {
    this.internalFiber.updateQueue.enqueue(new Update(partial))
    // 添加完成以后执行调度
    schedule()
  }
}

Component.prototype.isReactComponent = {} // 标记当前是类组件

export default {
  createElement,
  Component,
  useReducer,
  useState
}