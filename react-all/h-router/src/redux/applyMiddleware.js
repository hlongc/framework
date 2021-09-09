function compose(middleWares) {
  return function(dispatch) {
    return middleWares.reduceRight((memo, cur) => {
      return cur(memo)
    }, dispatch)
  }
}

export default function applyMiddleware(...middleWares) {
  return function(createStore) {
    return function(reducer) {
      const store = createStore(reducer)
      let dispatch
      const middleApi = {
        getState: store.getState,
        dispatch: action => dispatch(action)
      }
      const chain = middleWares.map(middleWare => middleWare(middleApi))
      dispatch = compose(chain)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}