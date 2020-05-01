import { TEXT } from './constant'
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

export default {
  createElement
}