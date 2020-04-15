import React from 'react'
import { Route, Link } from '.'

export default class NavLink extends React.Component {

  render() {
    const { to, exact = false, children } = this.props
    return (
      <Route path={to} exact={exact} children={
        props => <Link to={to} className={props.match && 'active'}>{children}</Link>
      } />
    )
  }
}