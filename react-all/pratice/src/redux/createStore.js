
export default function createStore(reducer, initial) {
  let state = initial
  let listener = []

  const dispatch = action => {
    state = reducer(state, action)
    listener.forEach(fn => fn())
    return action
  }

  const subscribe = fn => {
    listener.push(fn)
    return () => {
      listener = listener.filter(cb => cb !== fn)
    }
  }

  const getState = () => state
  dispatch({ type: '@REDUX/INIT' })
  return { dispatch, subscribe, getState }
}