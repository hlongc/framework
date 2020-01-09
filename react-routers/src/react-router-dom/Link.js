import React from 'react'

export default class Link extends React.Component {
  render() {
    return (
      <a href={'#' + this.props.to}>{this.props.children}</a>
    )
  }
}