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

class Component {
  constructor(props, context) {
    this.props = props
    this.context = context
  }
}
// isReactComponent用来标记当前是类组件
Component.prototype.isReactComponent = {}

class PureComponent extends Component{}
// 标记当前是纯类组件
PureComponent.prototype.isPureReactComponent = true
 
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
function createElement(type, config, children) {
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
  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    props.children = Array.prototype.slice.call(arguments, 2)
  }

  return ReactElement(type, ref, key, _self, _source, ReactCurrentOwn.current, props)
}


export default {
  createElement
}

export {
  Component,
  PureComponent
}