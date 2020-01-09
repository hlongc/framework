export default function ceateBrowserHistory() {
  const globalHistory = window.history
  const initialLocation = {
    pathname: window.location.pathname,
    state: globalHistory.state
  }
  const listener = []
  function createHref(location) {
    return location.protocol + location.host + location.hash
  }
  function setState(state) {
    Object.assign(history, state)
    history.length = globalHistory.length
    listener.forEach(fn => fn())
  }
  function push(pathname, state) {
    const location = { pathname, state }
    const action = 'PUSH'
    globalHistory.pushState(state, null, pathname)
    setState({ action, location })
  }
  function listen(fn) {
    listener.push(fn)
  }
  function go(n) {
    globalHistory.go(n)
  }
  function goBack(n) {
    go(-1)
  }
  function goForward(n) {
    go(1)
  }
  function replace(state, pathname) {
    globalHistory.replaceState(state, null, pathname)
  }
  let prompt
  function block(prompt) {
    prompt = prompt
  }
  const history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref,
    push,
    listen,
    go,
    goBack,
    goForward,
    replace,
    block
  }
  return history
}