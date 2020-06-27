import * as types from './types'

export const login = () => {
  sessionStorage.setItem('token', Math.random().toString(36).slice(2))
  return { type: types.LOGIN }
}

export const logout = () => {
  sessionStorage.removeItem('token')
  return { type: types.LOGOUT }
}