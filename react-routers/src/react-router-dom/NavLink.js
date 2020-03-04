import React from 'react'
import { Link, Route } from './index'
import './NavLink.css'

export default function NavLink(props) {
  const { to, exact, children } = props
  return (
    <Route path={to} exact={exact} children={
      routeProps => {
        return <Link className={ routeProps.match ? 'active' : '' } to={to}>{children}</Link>
      }
    } />
  )
}