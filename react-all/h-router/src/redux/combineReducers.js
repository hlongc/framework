export default function combineReducers (reduers) {
  return function(state = {}, action) {
    const nextState = {}
    for (const key in reduers) {
      const oldState = state[key]
      const reducerForKey = reduers[key]
      const newState = reducerForKey(oldState, action)
      nextState[key] = newState
    }
    return nextState
  }
}