
export default function createStore(reducer, initialState) {
  let state = initialState
  const listener = []

  function getState() {
    return state
  }

  function subscribe(cb) {
    listener.push(cb)
    return () => {
      const index = listener.indexOf(cb)
      listener.splice(index, 1)
    }
  }

  function dispatch(action) {
    state = reducer(state, action)
    listener.forEach(cb => cb())
    return action
  }

  dispatch({ type: 'REDUX@INIT' })
  return { getState, subscribe, dispatch }
}