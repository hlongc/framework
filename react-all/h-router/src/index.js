import { useState } from 'react'
import ReactDOM from 'react-dom'
// import { HashRouter, Route, Switch, Redirect, Link, NavLink, withRouter } from './react-router-dom'
// import { Provider } from './react-redux'
import { HashRouter, Route, Switch, Redirect, Link, NavLink, withRouter } from './pratice/react-router-dom'
import { Provider } from './pratice/react-redux'
import store from './components/reducer'
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'
import './index.css'
import WapperNavBar from './components/NavBar'

const App = () => {
  const routes = [
    { to: '/', children: '首页', id: 0 },
    { to: '/user', children: '用户', id: 1 },
    { to: '/hlongc/25', children: '个人中心', id: 2 },
    { to: '/dasdas', children: '随便', id: 3 }
  ]
  return (
    <div>
      <Provider store={store}>
        <HashRouter>
          <WapperNavBar title="hello world" />
          <ul>
            {
              routes.map(item => (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    exact={true}
                    className="foo"
                    style={{ fontSize: 14 }}
                    activeClassName="active"
                    activeStyle={{ color: 'deepskyblue' }}
                  >{ item.children }</NavLink>
                </li>
              ))
            }
          </ul>
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/user" component={User} />
            <Route path="/:name/:age" render={
              props => {
                return (
                  <div>
                    <p>profile</p>
                    {props.match.params.name}
                    <p>{props.match.params.age}</p>
                  </div>
                )
              }
            } />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
      </Provider>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
