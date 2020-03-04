import React from 'react'
import { Route } from './index'

export default function withRouter(Component) {
  return props => <Route component={Component} />
}
