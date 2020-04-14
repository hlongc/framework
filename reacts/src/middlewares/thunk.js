export default function thunk({ dispatch, getState }) {
  return function(next) {
    return function(action) {
      if (typeof action === 'function') { // 如果是函数，那么传入dispatch和getState
        action(dispatch, getState)
      } else { // 否则继续调用下一个中间件
        next(action)
      }
    }
  }
}