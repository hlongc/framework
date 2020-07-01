import * as types from './types'
import { IAction } from '@/types'


const initState = {
  login: false,
  user: { username: '' }
}

// 登录状态
const loginStatus = (prevState = initState, action: IAction) => {
  switch (action.type) {
    case types.LOGIN:
      return { login: true, user: action.data }
    case types.LOGOUT:
      return initState
    default:
      return prevState
  }
}

export default loginStatus