import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter basename="/react">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/user">User</Link>
      <Switch>
        <Route path="/" exact render={() => <h2>react home</h2>}></Route>
        <Route path="/about" render={() => <h2>react about</h2>}></Route>
        <Route path="/user" render={() => <h2>react user</h2>}></Route>
      </Switch>
    </BrowserRouter>
  )
}