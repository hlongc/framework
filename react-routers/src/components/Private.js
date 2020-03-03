import React from 'react'
import { Route, Redirect } from '../react-router-dom'

export default function Private(props) {
  const { path, component: Component } = props
  return <Route path={path} render={routeProps => {
    return sessionStorage.getItem('login') ? <Component {...routeProps} /> : <Redirect to={{ pathname: '/login', state: { from: routeProps.location.pathname } }} />
  }} />
}