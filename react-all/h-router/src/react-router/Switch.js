import React from 'react'
import RouterContext from './RouterContext'
import { matchUrl } from './match'

export default class Switch extends React.Component {
  static contextType = RouterContext
  render() {
    let element, match
    const { location: { pathname } } = this.context
    React.Children.forEach(this.props.children, child => {
      // 如果已经匹配成功就不继续匹配了
      if (!match && React.isValidElement(child)) {
        const { path = '/', exact = false } = child.props
        element = child
        match = matchUrl({ pathname, path, exact })
      }
    })
    return match ? React.cloneElement(element, { computeMatch: match }) : null
  }
}