import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom'


function Home(props) {
  console.log(props)
  return <div>Home</div>
}

function Info(props) {
  return <div>Info</div>
}

function User(props) {
  return <div>User</div>
}

function App() {
  return (
    <Router>
      <div>
        <Link to='/home'>home</Link>
        <Link to='/info'>info</Link>
        <Link to='/user'>user</Link>
      </div>
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/info' component={Info} />
        <Route path='/user' component={User} />
        <Redirect to='/home' />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))