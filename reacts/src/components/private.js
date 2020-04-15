import React from 'react'
import { Route, Redirect } from '../react-router-dom'

export default class Private extends React.Component {
  render() {
    const username = sessionStorage.getItem('username')
    const { to, component } = this.props
    return username ? <Route to={to} children={component} /> : <Redirect to="/login" />
  }
}