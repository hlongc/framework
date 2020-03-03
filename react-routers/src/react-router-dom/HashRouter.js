import React from 'react'
import RouterContext from './RouterContext'

export default class HashRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {
        pathname: window.location.hash.slice(1),
        state: window.history.state
      }
    }
  }
  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange)
    window.location.hash = window.location.hash || '/'
  }
  handleHashChange = () => {
    this.setState({
      ...this.state,
      location: {
        pathname: window.location.hash.slice(1) || '/',
        state: window.history.state
      }
    })
  }
  componentWillMount() {
    window.removeEventListener('hashchange', this.handleHashChange)
  }
  render() {
    const history = {
      location: this.state.location,
      push(path) {
        window.location.hash = path
      }
    }
    const value = {
      location: this.state.location,
      history
    }
    return (
      <RouterContext.Provider value={value}>
        { this.props.children }
      </RouterContext.Provider>
    )
  }
}