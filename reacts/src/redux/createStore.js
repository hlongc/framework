export default function createStore(reducer, initState) {
  let state
  state = initState
  const listener = []

  function dispatch(action) {
    state = reducer(state, action)
    // 无论action.type是否匹配成功，都要执行订阅函数
    listener.forEach(fn => fn())
    return action
  }

  function subscribe(fn) {
    listener.push(fn)
    return function() {
      const index = listener.indexOf(fn)
      listener.splice(index, 1)
    }
  }

  function getState() {
    return state
  }
  dispatch({ type: '@REDUX_INIT' })
  return {
    dispatch,
    subscribe,
    getState
  }
}