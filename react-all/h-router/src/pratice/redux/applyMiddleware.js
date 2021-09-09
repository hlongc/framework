
function compose(fns) {
  return function(dispatch) {
    return fns.reduceRight((memo, cur) => {
      return cur(memo)
    }, dispatch)
  }
}

export default function applyMiddleware(...middleWares) {
  return function(createStore) {
    return function(reducer) {
      const store = createStore(reducer)
      let dispatch
      const midApi = {
        getState: store.getState,
        dispatch: action => dispatch(action)
      }
      const chain = middleWares.map(middleWare => middleWare(midApi))
      dispatch = compose(chain)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}