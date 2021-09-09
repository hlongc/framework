import { ADD1, MINUS1, ADD } from '../actions'
let initialState = { name: 'count1', count: 5 }

export default function counter1 (state = initialState, action) {
  switch(action.type) {
    case ADD1:
      return { ...state, count: state.count + 2 }
    case MINUS1:
      return { ...state, count: state.count - 2 }
    case ADD:
      return { ...state, count: state.count + 5 }
    default:
      return state
  }
}