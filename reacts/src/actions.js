import types from './types'
export default {
  add() {
    return { type: types.ADD }
  },
  minus() {
    return { type: types.MINUS }
  }
}