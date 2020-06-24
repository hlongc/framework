import React from 'react'
import { Route, Redirect } from '../react-router-dom'

export default class Private extends React.Component {
  render() {
    const username = sessionStorage.getItem('username')
    const { path, component } = this.props
    return username ? <Route path={path} component={component} /> : <Redirect to="/login" />
  }
}