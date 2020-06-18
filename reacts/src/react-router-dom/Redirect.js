import React, { useContext } from 'react'
import RouterContext from './RouterContext'

// export default class Redirect extends React.Component {
//   static contextType = RouterContext
//   render() {
//     if (!this.props.from || this.props.from === this.context.location.pathname) {
//       this.context.history.push(this.props.to)
//     }
//     return null
//   }
// }

export default function Redirect(props) {
  const context = useContext(RouterContext)
  const { location: { pathname } } = context
  if (!props.from || props.from === pathname) {
    context.history.push(props.to)
  }
  return null
}