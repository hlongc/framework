import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Switch, Redirect, NavLink } from './react-router-dom'
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'
import Private from './components/Private'
import Login from './components/Login'

ReactDOM.render(
  <Router>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/user">User</NavLink>
    <NavLink to="/profile">Profile</NavLink>
    <p>{sessionStorage.getItem('login')}</p>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/user" component={User} />
      <Private path="/profile" component={Profile} />
      <Redirect from="/home" to="/" />
    </Switch>
  </Router>, 
  document.getElementById('root')
)

