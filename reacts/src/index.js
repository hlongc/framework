import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Switch, Redirect } from './react-router-dom'
import Home from './components/home'
import Info from './components/info'
import User from './components/user'

ReactDOM.render(
  <Router>
    <ul>
      <li><Link to="/">首页</Link></li>
      <li><Link to="/info">个人中心</Link></li>
      <li><Link to="/user">列表页</Link></li>
    </ul>
    <Switch>
      <Route path="/" component={Home} exact={true} />
      <Route path="/info" component={Info} />
      <Route path="/info" component={Info} />
      <Route path="/user" component={User} />
      <Redirect from="/home" to="/" />
    </Switch>
  </Router>,
  document.getElementById('root')
)


