export default function bindActionCreators(creators, dispatch) {
  const bound = {}
  for (const key in creators) {
    bound[key] = function(...args) {
      return dispatch(creators[key](...args))
    }
  }
  return bound
}