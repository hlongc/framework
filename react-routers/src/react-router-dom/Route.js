import React from 'react'
import pathToRegexp from 'path-to-regexp'
import RouterContext from './RouterContext'

export default class Route extends React.Component {
  static contextType = RouterContext
  render() {
    const { path = '/', component: Component, exact = false } = this.props
    const realPath = this.context.location.pathname
    let paramsName = []
    // exact 表示是否精准匹配
    const reg = pathToRegexp(path, paramsName, { end: exact })
    if (reg.test(realPath)) {
      return <Component history={this.context.history} />
    }
    return null
  }
}