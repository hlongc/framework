import React from 'react'
import { createHashHistory } from '../history'
import { Router } from '../react-router'


export default class HashRouter extends React.Component {
  render() {
    const history = createHashHistory()
    return (
      <Router history={history}>
        { this.props.children }
      </Router>
    )
  }
}