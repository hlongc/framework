import * as types from './types'
import { IUser } from '@/types'

export const login = (user: IUser) => {
  sessionStorage.setItem('token', Math.random().toString(36).slice(2) + '.' + encodeURIComponent(user.username))
  return { type: types.LOGIN, data: user }
}

export const logout = () => {
  sessionStorage.removeItem('token')
  return { type: types.LOGOUT }
}
