import React, { useState, useEffect } from 'react'
import RouterContext from './RouterContext'

export default function BrowserRouter(props) {
  const [currentState, setCurrentState] = useState({ location: { pathname: '/' } })

  useEffect(() => {
    window.onpushstate = function(state, pathname) {
      setCurrentState({
        location: {
          ...currentState.location,
          pathname,
          state
        }
      })
    }
    window.onpopstate = function(event) {
      setCurrentState({
        location: {
          ...currentState.location,
          pathname: window.location.pathname,
          state: event.state
        }
      })
    }
  }, [])

  const location = currentState.location
  const globalHistory = window.history
  const history = {
    location,
    push(to) { // 判断当前传入的是字符串还是对象
      if (history.blocking) {
        const yes = window.confirm(history.blocking(location)) // 弹出确认框提示是否要进行跳转
        if (!yes) return
      }
      if (typeof to === 'object') {
        const { pathname, state } = to
        globalHistory.pushState(state, null, pathname)
      } else {
        globalHistory.pushState(null, null, to)
      }
    },
    block(message) {
      history.blocking = message
    },
    unblock() {
      history.blocking = null
    }
  }
  const value = { location, history }
  return (
    <RouterContext.Provider value={value}>
      { props.children }
    </RouterContext.Provider>
  )
}