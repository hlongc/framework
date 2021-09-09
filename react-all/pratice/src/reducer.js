import { combineReducer } from './redux'

let init1 = { count: 0 }

function counter(state = init1, action) {
  switch (action.type) {
    case 'ADD1':
      return { ...state, count: state.count + 1 }
    case 'ADD2':
      return { ...state, count: state.count + 2 }
    case 'ADD3':
      return { ...state, count: state.count + 3 }
      default:
        return state
  }
}

let init2 = { name: 'test' }
function user(state = init2, action) {
  switch (action.type) {
    case 'EDIT':
      return { ...state, name: state.name + 'x' }
    case 'RESET':
      return init2
      default:
        return state
  }
}

export default combineReducer({ counter, user })