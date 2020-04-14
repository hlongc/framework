import React from 'react'
import pathToRegexp from 'path-to-regexp'
import RouterContext from './RouterContext'

export default class Route extends React.Component {
  static contextType = RouterContext
  render() {
    const { path = '/', component: Component, exact = false } = this.props
    const pathname = this.context.location.pathname // 当前url上的pathname
    let paramNames = []
    const reg = pathToRegexp(path, paramNames, { end: exact })
    paramNames = paramNames.map(item => item.name)
    const matched = pathname.match(reg)
    if (matched) {
      const [url, ...values] = matched
      const params = values.reduce((memo, value, index) => {
        memo[paramNames[index]] = value
        return memo
      }, {})
      const props = {
        ...this.context,
        match: {
          url,
          path,
          params,
          isExact: url === pathname
        }
      }
      return <Component {...props} />
    }
    return null
  }
}