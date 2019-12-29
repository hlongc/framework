const hasSymbol = typeof Symbol === 'function' && Symbol.for;
export const REACT_ELEMENT_TYPE = hasSymbol
    ? Symbol.for('react.element')
    : 0xeac7;

export class Component {
  constructor(props) {
    this.props = props
  }
  static isReactComponent = true
}
 
    
function createElement(type, config, children) {
  const props = {}
  for (const key in config) {
    props[key] = config[key]
  }

  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    props.children = Array.prototype.slice.call(arguments, 2)
  }
  return { $$type: REACT_ELEMENT_TYPE, type, props }
}


export default {
  createElement
}