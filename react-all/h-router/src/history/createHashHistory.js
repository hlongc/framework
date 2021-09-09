
export default function createHashHistory() {
  let action = 'POP'
  const listeners = []

  const historyStack = []
  let index = -1
  let state = undefined
  let message

  const history = {
    push,
    replace,
    go,
    goBack,
    goForward,
    listen,
    block,
    location: { pathname: window.location.hash.slice(1) || '/', state },
    action: 'POP'
  }

  window.addEventListener('hashchange', () => {
    const location = historyStack[index] || { location: window.location.hash.slice(1), state }
    Object.assign(history, { action, location })
    listeners.forEach(cb => cb(history.location))
  })

  function block(msg) {
    message = msg
    return () => {
      message = null
    }
  }

  function listen(cb) {
    listeners.push(cb)
    return () => {
      const index = listeners.indexOf(cb)
      listeners.splice(index, 1)
    }
  }
  function replace(pathname) {
    let state
    if (typeof pathname === 'object' && pathname !== null) {
      pathname = pathname.path
      state = pathname.state
    } else {
      state = arguments[1]
    }
    action = 'REPLACE'
    historyStack[index] = { pathname, state }
    window.location.hash = pathname
  }
  function push(pathname) {
    let state
    if (typeof pathname === 'object' && pathname !== null) {
      pathname = pathname.path
      state = pathname.state
    } else {
      state = arguments[1]
    }
    if (message) {
      const ensure = window.confirm(message({ pathname }))
      if (!ensure) return
    }
    action = 'PUSH'
    historyStack[++index] = { pathname, state }
    window.location.hash = pathname
  }
  function go(n) {
    action = 'POP'
    index += n
    const location = historyStack[index]
    state = location.state
    window.location.hash = location.pathname
  }
  function goBack() {
    go(-1)
  }
  function goForward() {
    go(1)
  }
  window.location.hash = window.location.hash ? window.location.hash.slice(1) : '/'
  push(window.location.hash.slice(1))
  return history
}