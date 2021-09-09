import { useContext } from 'react'
import RouterContext from './RouterContext'
import matchUrl from './match'

function isFunction(val) {
  return typeof val === 'function'
}

export default function Route(props) {
  const { path = '/', exact = false, computeMatch, component: Component, render, children } = props
  const { history, location } = useContext(RouterContext)
  const match = computeMatch || matchUrl({ pathname: location.pathname, path, exact })
  const routerProps = {
    history,
    location
  }
  if (match) {
    routerProps.match = match
    if (Component) {
      return <Component {...routerProps} />
    } else if (isFunction(render)) {
      return render(routerProps)
    } else if (isFunction(children)) {
      return children(routerProps)
    } else {
      return null
    }
  } else {
    if (isFunction(children)) {
      return children(routerProps)
    } else {
      return null
    }
  }
}