export default function promise({ dispatch, getState }) {
  return function(next) {
    return function(action) {
      if (typeof action.then === 'function') {
        action.then(next)
      } else {
        next(action)
      }
    }
  }
}