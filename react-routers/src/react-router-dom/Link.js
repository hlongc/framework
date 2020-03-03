import React from 'react'
import RouterContext from './RouterContext'

export default function(props) {
  const to = typeof props.to === 'string' ? props.to : props.to.pathname
  return (
    <RouterContext.Consumer>
      {
        value => <a {...props} href={`#${to}`} onClick={() => value.history.push(props.to)}>{props.children}</a>
      }
    </RouterContext.Consumer>
  )
}

// export default class Link extends React.Component {
//   render() {
//     return (
//       <a href={'#' + this.props.to}>{this.props.children}</a>
//     )
//   }
// }