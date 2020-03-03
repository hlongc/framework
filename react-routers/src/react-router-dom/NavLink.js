import React from 'react'
import { Link, Route } from './index'
import './NavLink.css'

export default function NavLink(props) {
  const { to, children } = props
  return (
    <Route path={to} children={
      routeProps => {
        return <Link className={ routeProps.match && routeProps.match.isExact ? 'active' : '' } to={to}>{children}</Link>
      }
    } />
  )
}