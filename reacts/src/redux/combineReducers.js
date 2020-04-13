export default function combineReducers(reducers) {
  return function(state = {}, action) {
    const combineState = {}
    for (const key in reducers) {
      const reducer = reducers[key] // 每个状态对应的reducer
      const oldState = state[key] // 对应的老状态
      combineState[key] = reducer(oldState, action) // 新状态
    }
    return combineState
  }
}