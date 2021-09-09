import { ADD2, MINUS2, ADD } from '../actions'
let initialState = { name: 'count2', count: 5 }

export default function counter2 (state = initialState, action) {
  switch(action.type) {
    case ADD2:
      return { ...state, count: state.count + 3 }
    case MINUS2:
      return { ...state, count: state.count - 3 }
    case ADD:
      return { ...state, count: state.count + 5 }
    default:
      return state
  }
}