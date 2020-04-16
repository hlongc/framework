import React from 'react'
import RouterContext from './RouterContext'

export default class HashRouter extends React.Component {
  state = {
    location: {
      pathname: window.location.hash.slice(1),
      state: window.history.state
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        ...this.state,
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1)
        }
      })
    })
    // 设置hash默认值
    window.location.hash = window.location.hash || '/'
  }

  render() {
    const history = {
      location: this.state.location,
      block(message) {
        history.message = message
      },
      unblock() {
        history.message = null
      },
      push(pathname, state) {
        if (history.message) {
          const location = typeof pathname === 'string' ? { pathname } : pathname
          const message = typeof history.message === 'function' ? history.message(location) : history.message
          const confirm = window.confirm(message)
          if (!confirm) return // 取消跳转
        }
        window.location.hash = pathname
      }
    }
    const state = {
      location: this.state.location,
      history
    }
    return (
      <RouterContext.Provider value={state}>
        { this.props.children }
      </RouterContext.Provider>
    )
  }
}