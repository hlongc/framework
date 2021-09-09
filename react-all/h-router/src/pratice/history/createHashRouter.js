
export default function createHashRouter() {
  let action = 'POP'
  let message = null
  let state
  let index = -1
  const stack = [] // 利用栈来实现前进后腿
  const listener = []


  const listen = cb => {
    listener.push(cb)
    return () => {
      const index = listener.indexOf(cb)
      listener.splice(index, 1)
    }
  }

  const go = n => {
    action = 'POP'
    index += n
    const { pathname, state: stat } = stack[index]
    state = stat
    window.location.hash = pathname
  }

  const goBack = () => go(-1)

  const goForward = () => go(1)

  const block = msg => {
    message = msg
    return () => {
      message = null
    }
  }

  function push(pathname) {
    let tmpState
    if (typeof pathname === 'object' && pathname !== null) {
      tmpState = pathname.state
      pathname = pathname.path
    } else {
      tmpState = arguments[1]
    }
    if (message) {
      const confirm = window.confirm(message({ pathname }))
      if (!confirm) return
    }
    stack[++index] = { pathname, state: tmpState }
    state = tmpState
    action = 'PUSH'
    window.location.hash = pathname
  }

  function replace(pathname) {
    let tmpState
    if (typeof pathname === 'object' && pathname !== null) {
      state = pathname.state
      tmpState = pathname.path
    } else {
      tmpState = arguments[1]
    }
    if (message) {
      const confirm = window.confirm(message({ pathname }))
      if (!confirm) return
    }
    stack[index] = { pathname, state: tmpState }
    state = tmpState
    action = 'REPLACE'
    window.location.hash = pathname
  }

  const history = {
    listen,
    push,
    replace,
    go,
    goBack,
    goForward,
    block,
    action,
    location: { pathname: window.location.hash.slice(1) || '/', state }
  }

  window.addEventListener('hashchange', () => {
    const location = stack[index] || { pathname: window.location.pathname || '/', state }
    Object.assign(history, { location, action })
    listener.forEach(cb => cb(history.location))
  })
  // hash给默认值
  window.location.hash = window.location.hash ? window.location.hash.slice(1) : '/'
  push(window.location.hash.slice(1))

  return history
}