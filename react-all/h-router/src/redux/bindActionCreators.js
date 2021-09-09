export default function bindActionCreators(actions, dispatch) {
  const boundActions = {}
  for (const key in actions) {
    boundActions[key] = function(...args) {
      return dispatch(actions[key](...args))
    }
  }
  return boundActions
}