

export default function bindActionCreators(actionCreators, dispatch) {
  const bound = {}
  for (const key in actionCreators) {
    bound[key] = function(...args) {
      return dispatch(actionCreators[key](...args))
    }
  }
  return bound
}