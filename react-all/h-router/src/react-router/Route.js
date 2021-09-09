import React from 'react'
import RouterContext from './RouterContext'
import { matchUrl } from './match'

function isFunction(val) {
  return typeof val === 'function'
}

export default class Route extends React.Component {
  static contextType = RouterContext

  render() {
    const { history, location } = this.context
    const { exact = false, path = '/', component: RouteComponent, computeMatch, render, children } = this.props
    const match = computeMatch || matchUrl({ pathname: location.pathname, path, exact })
    const props = { history, location }
    if (match) {
      props.match = match
      if (RouteComponent) {
        return <RouteComponent { ...props } />
      } else if (render && isFunction(render)) {
        return render(props)
      } else if (children && isFunction(children)) {
        return children(props)
      }
    } else {
      if (children && isFunction(children)) {
        return children(props)
      }
    }
    return null
  }
}