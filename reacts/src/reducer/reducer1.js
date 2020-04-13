import types from '../types'

const initialState = {
  count: 0
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD:
      return { ...state, count: state.count + 1 }
    case types.MINUS:
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}