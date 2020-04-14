export default function createBrowserHistory() {
  const globalHistory = window.history
  let isBlocking
  const listener = []

  function setState({ action, location }) {
    history.length = globalHistory.length
    Object.assign(history, { action, location })
    listener.forEach(fn => fn)
  }
  function push(pathname, state) {
    const action = 'PUSH'
    const location = { pathname, state }
    globalHistory.pushState(state, null, pathname)
    setState({ action, location })
  }
  function replace(pathname, state) {
    const action = 'REPLACE'
    const location = { pathname, state }
    globalHistory.replaceState(state, null, pathname)
    setState({ action, location })
  }
  function go(n) {
    globalHistory.go(n)
  }
  function goBack() {
    globalHistory.go(-1)
  }
  function goForward() {
    globalHistory.go(1)
  }
  function block(prompt) {
    isBlocking = prompt
  }
  function listen(fn) {
    listener.push(fn)
  }

  const location = {
    pathname: globalHistory.location.pathname,
    state: globalHistory.history.state
  }

  const history = {
    length: globalHistory.length,
    action: 'POP',
    location,
    push,
    go,
    goBack,
    goForward,
    replace,
    createHref,
    block,
    listen
  }

  return history
}