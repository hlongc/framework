import { Component, PureComponent } from './component'
import { REACT_ELEMENT_TYPE, TEXT, ELEMENT, FUNCTION_COMPONENT, CLASS_COMPONENT } from './constant'
import ReactCurrentOwner from './ReactCurrentOwner'

// 保留字段
const RESERVED = {
  ref: true,
  key: true,
  _self: true,
  _source: true
}

// 创建react元素
function ReactElement(type, ref, key, _self, _source, _owner, props) {
  let $$typeof = typeof type === 'string' ? ELEMENT : REACT_ELEMENT_TYPE
  if (typeof type === 'string') {
    $$typeof = ELEMENT
  } else if (typeof type === 'function') {
    $$typeof = type.prototype.isReactComponent ? CLASS_COMPONENT : FUNCTION_COMPONENT
  }
  return {
    $$typeof,
    type,
    ref,
    key,
    _self, // this指向
    _source, // 源码位置
    _owner, // 谁拥有这个组件
    props
  }
}

// 处理传入参数
function createElement(type, config, ...children) {
  const props = {}
  let propName = ''

  let ref = null
  let key = null
  let _self = null
  let _source = null

  if (config !== null) {
    ref = config.ref ? config.ref : undefined
    key = config.key ? config.key : undefined
    _self = config._self ? config._self : undefined
    _source = config._source ? config._source : undefined

    delete config.ref
    delete config.key
    delete config._self
    delete config._soucre

    for (propName in config) {
      if (!RESERVED.hasOwnProperty(propName)) {
        props[propName] = config[propName]
      }
    }
  }

  // 类组件的defaultProps合并到props上面
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps
    for (propName in defaultProps) {
      // props中不存在才赋值
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName]
      }
    }
  }

  // 处理子元素
  // const childrenLength = arguments.length - 2
  // if (childrenLength === 1) {
  //   props.children = children
  // } else if (childrenLength > 1) {
  //   props.children = Array.prototype.slice.call(arguments, 2)
  // }
  props.children = children.map(child => {
    // 将文本节点处理为一个对象，便于后续dom-diff
    return typeof child === 'object' ? child : { $$typeof: TEXT, type: TEXT , content: child }
  })

  return ReactElement(type, ref, key, _self, _source, ReactCurrentOwner.current, props)
}


export default {
  createElement,
  Component,
  PureComponent
}

export {
  Component,
  PureComponent
}