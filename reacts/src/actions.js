import types from './types'
export default {
  add() {
    return { type: types.ADD }
  },
  minus() {
    return { type: types.MINUS }
  },
  thunk() {
    return (dispatch, getState) => {
      setTimeout(() => {
        dispatch(this.add())
      }, 1000)
    }
  },
  promise() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('promise + 1')
        resolve(this.add())
      }, 1000)
    })
  }
}