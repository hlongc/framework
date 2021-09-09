export default function combineReducer(reducers) {
  return function(state = {}, action) {
    const combineState = {}
    for (const key in reducers) {
      const prevState = state[key]
      const reducerForKey = reducers[key]
      const curState = reducerForKey(prevState, action)
      combineState[key] = curState
    }
    return combineState
  }
}