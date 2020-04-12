import { Component, PureComponent } from './component'

const hasSymbol = typeof Symbol === 'function' && Symbol.for;
export const REACT_ELEMENT_TYPE = hasSymbol
    ? Symbol.for('react.element')
    : 0xeac7;

const RESERVED = {
  ref: true,
  key: true,
  _self: true,
  _source: true
}

const ReactCurrentOwn = { current: null }
 
// 创建react元素
function ReactElement(type, ref, key, _self, _source, _owner, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    ref,
    key,
    _self,
    _source,
    _owner,
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
    return typeof child === 'object' ? child : { content: child }
  })

  return ReactElement(type, ref, key, _self, _source, ReactCurrentOwn.current, props)
}


export default {
  createElement
}

export {
  Component,
  PureComponent
}