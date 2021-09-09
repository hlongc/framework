
function compose(chain, dispatch) {
  return chain.reduceRight((memo, cur) => {
    return cur(memo)
  }, dispatch)
}

export default function applyMiddleware(...middlewares) {
  return function(createStore) {
    return function(reducer) {
      const store = createStore(reducer)
      let dispatch
      const midApi = {
        getState: store.getState,
        dispatch: action => dispatch(action)
      }
      const chain = middlewares.map(fn => fn(midApi))
      dispatch = compose(chain, store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}