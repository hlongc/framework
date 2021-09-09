import React from 'react'
import { createBrowserHistory } from '../history'
import { Router } from '../react-router'


export default class BrowserHistory extends React.Component {
  render() {
    const history = createBrowserHistory()
    return (
      <Router history={history}>
        { this.props.children }
      </Router>
    )
  }
}