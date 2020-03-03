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
        ...this.state.location,
        pathname: window.location.hash.slice(1) || '/',
        state: this.locationState
      }
    })
  }
  componentWillMount() {
    window.removeEventListener('hashchange', this.handleHashChange)
  }
  render() {
    const that = this
    const history = {
      location: this.state.location,
      push(to) { // 判断当前传入的是字符串还是对象
        if (typeof to === 'object') {
          const { pathname, state } = to
          that.locationState = state
          window.location.hash = pathname
        } else {
          window.location.hash = to
        }
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