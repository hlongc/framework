import React from 'react'
import RouterContext from './RouterContext'

export default class Link extends React.Component {
  static contextType = RouterContext
  
  handleClick = e => {
    e.preventDefault()
    this.context.history.push(this.props.to)
  }

  render() {
    return <a href={`#${this.props.to}`} {...this.props} onClick={e => this.handleClick(e)}>{this.props.children}</a>
  }
}