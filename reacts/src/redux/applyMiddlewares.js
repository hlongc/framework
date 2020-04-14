import compose from './compose'

export default function applyMiddlewares(...middlewares) {
  return function(createStore) {
    return function(reducer) {
      const store = createStore(reducer)
      let dispatch
      const middleApi = {
        getState: store.getState,
        dispatch: action => dispatch(action)
      }
      middlewares = middlewares.map(fn => fn(middleApi))
      const chain = compose(...middlewares)
      dispatch = chain(store.dispatch) // 传入真正的dispatch，只有第一个中间件才能收到真正的dispatch
      return { ...store, dispatch }
    }
  }
}