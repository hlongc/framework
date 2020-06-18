import React, { useContext } from 'react'
import pathToRegexp from 'path-to-regexp'
import RouterContext from './RouterContext'

// export default class Switch extends React.Component {
//   static contextType = RouterContext

//   render() {
//     const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children]
//     const pathname = this.context.location.pathname
//     for (let i = 0; i < children.length; i++) {
//       const child = children[i]
//       const { path = '/', component: Component, exact = false } = child.props
//       const reg = pathToRegexp(path, [], { end: exact })
//       if (pathname.match(reg)) {
//         return child // 此处返回child，而非<Component />，因为不是任何一个子元素都会提供component属性，比如<Redirect from="/home" to="/" />
//       }
//     }
//     return null
//   }
// }

export default function Switch(props) {
  const { location: { pathname } } = useContext(RouterContext)
  const children = Array.isArray(props.children) ? props.children : [props.children]
  for (let i = 0; i < children.length; i++) {
    const { path = '/', exact = false } = children[i].props
    const reg = pathToRegexp(path, [], { end: exact })
    if (pathname.match(reg)) {
      return children[i]
    }
  }
  return null
}