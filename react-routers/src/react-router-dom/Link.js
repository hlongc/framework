import React from 'react'
import RouterContext from './RouterContext'

export default function(props) {
  return (
    <RouterContext.Consumer>
      {
        value => <a href={`#${props.to}`} onClick={() => value.history.push(props.to)}>{props.children}</a>
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