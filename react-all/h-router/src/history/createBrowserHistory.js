export default function createBrowserHistory() {
  let action = 'POP', state = undefined
  const listeners = []
  const globalHistory = window.history

  const history = {
    push,
    replace,
    go,
    goBack,
    goForward,
    listen,
    location: { pathname: window.location.pathname, state: globalHistory.state },
    action: 'POP'
  }

  function listen(cb) {
    listeners.push(cb)
    return () => {
      const index = listeners.indexOf(cb)
      listeners.splice(index, 1)
    }
  }
  function notify(newHistory) {
    Object.assign(history, newHistory)
    listeners.forEach(cb => cb(newHistory.location))
  }
  window.onpopstate = function(event) {
    console.log(event)
    notify({ action: 'POP', location: { pathname: window.location.pathname, state: globalHistory.state } })
  }
  function replace(pathname) {
    if (typeof pathname === 'object' && pathname !== null) {
      pathname = pathname.path
      state = pathname.state
    } else {
      state = arguments[1]
    }
    action = 'REPLACE'
    globalHistory.replaceState(state, null, pathname)
    notify({ action, location: { pathname, state } })
  }
  function push(pathname) {
    if (typeof pathname === 'object' && pathname !== null) {
      pathname = pathname.path
      state = pathname.state
    } else {
      state = arguments[1]
    }
    action = 'PUSH'
    globalHistory.pushState(state, null, pathname)
    notify({ action, location: { pathname, state } })
  }
  function go(n) {
    globalHistory.go(n)
  }
  function goBack() {
    go(-1)
  }
  function goForward() {
    go(1)
  }
  
  return history
}