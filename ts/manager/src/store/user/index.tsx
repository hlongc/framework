import { combineReducers } from 'redux'
import * as types from './types'

interface Action {
  type: string;
  data?: any;
}

const loginStatus = (prevState = false, action: Action) => {
  switch (action.type) {
    case types.LOGIN:
      return true
    case types.LOGOUT:
      return false
    default:
      return prevState
  }
}

export default combineReducers({
  loginStatus
})