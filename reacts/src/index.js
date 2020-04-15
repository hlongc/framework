import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, NavLink, Switch, Redirect } from './react-router-dom'
import Home from './components/home'
import Info from './components/info'
import User from './components/user'
import Login from './components/login'
import Private from './components/private'

ReactDOM.render(
  <Router>
    <ul>
      <li><NavLink to="/" exact>首页</NavLink></li>
      <li><NavLink to="/info">个人中心</NavLink></li>
      <li><NavLink to="/user">列表页</NavLink></li>
    </ul>
    <Switch>
      <Route path="/" component={Home} exact={true} />
      <Route path="/info" component={Info} />
      <Route path="/info" component={Info} />
      <Private path="/user" component={User} />
      <Route path="/login" component={Login} />
      <Redirect from="/home" to="/" />
    </Switch>
  </Router>,
  document.getElementById('root')
)


