export default function bindActionCreators(actions, dispatch) {
  const bindActions = {}
  for (const key in actions) {
    bindActions[key] = (...args) => {
      dispatch(actions[key](...args))
    }
  }
  return bindActions
}