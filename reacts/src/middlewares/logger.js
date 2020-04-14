export default function logger({ dispatch, getState }) {
  return function(next) { // next代表下一个中间件或者真正的store.dispatch
    return function(action) { // 增强以后的dispatch方法
      console.log('老状态', getState())
      next(action)
      console.log('新状态', getState())
    }
  }
}