import React from 'react'
import { Route } from './index'

export default function withRouter(Component) {
  // 高阶组件要将原组件接收到的属性接着传下去
  return props => (
    <Route render={ 
      routeProps => <Component {...props} {...routeProps} />
    } />
  )
}
