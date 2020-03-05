import React, { useContext } from 'react'
import RouterContext from './RouterContext'

export default function(props) {
  const to = typeof props.to === 'string' ? props.to : props.to.pathname
  const context = useContext(RouterContext)
  function handleClick(e) {
    e.preventDefault()
    context.history.push(props.to)
  }
  
  return (
    <a {...props} href={`#${to}`} onClick={handleClick}>{props.children}</a>
  )
}

// export default class Link extends React.Component {
//   render() {
//     return (
//       <a href={'#' + this.props.to}>{this.props.children}</a>
//     )
//   }
// }