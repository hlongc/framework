import React, { useContext } from 'react'
import RouterContext from './RouterContext'
import matchUrl from './match'

export default function Switch(props) {
  const { children } = props
  const { location: { pathname } } = useContext(RouterContext)
  let match, target
  React.Children.map(children, child => {
    if (!match && React.isValidElement(child)) {
      const { path = '/', exact = false } = child.props
      match = matchUrl({ pathname, path, exact })
      if (match) {
        target = React.cloneElement(child, { computeMatch: match })
      }
    }
  })
  return target
}