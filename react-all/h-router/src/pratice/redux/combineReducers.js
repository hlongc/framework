

export default function combineReducers(reducers) {
  return function(state = {}, action) {
    const combineState = {}
    for (const key in reducers) {
      const prevState = state[key]
      combineState[key] = reducers[key](prevState, action)
    }
    return combineState
  }
}