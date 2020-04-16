import React from 'react'
import RouterContext from './RouterContext'

export default class Prompt extends React.Component {
  static contextType = RouterContext

  render() {
    const { history } = this.context
    const { when, message } = this.props
    if (when) {
      history.block(message)
    } else {
      history.unblock()
    }
    return null
  }
}