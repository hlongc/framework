export default function createStore(reducer, initialState) {
  const listeners = []
  let state = initialState
  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(cb => cb())
    return action
  }
  function subscribe(cb) {
    listeners.push(cb)
    return () => {
      const index = listeners.indexOf(cb)
      listeners.splice(index, 1)
    }
  }
  function getState() {
    return state
  }
  dispatch({ type: '@REDUX/INIT' })
  return {
    dispatch,
    subscribe,
    getState
  }
}