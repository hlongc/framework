import React from 'react'
import ReactDom from 'react-dom'

const memoizedStates = []
let index = 0

const ADD = 'ADD'
const MINUS = 'MINUS'

function reducer(state, action) {
  switch(action.type) {
    case ADD:
      return { ...state, count: state.count + 1 }
    case MINUS:
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}

function func(args) {
  return { count: args }
}

function useReducer(reducer, initArgs, initFn) {
  let state
  if (initFn && typeof initFn === 'function') {
    state = initFn(initArgs)
  } else {
    state = initArgs
  }
  memoizedStates[index] = memoizedStates[index] || state
  const current = index
  function dispatch(action) {
    memoizedStates[current] = reducer(memoizedStates[current], action)
    render()
  }
  return [memoizedStates[index++], dispatch]
}



function Counter() {
  const [state, dispatch] = useReducer(reducer, 0, func)
  console.log(state)
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: ADD })}>加</button>
      <button onClick={() => dispatch({ type: MINUS })}>减</button>
    </div>
  )
}

function render() {
  index = 0
  ReactDom.render(<Counter />, document.getElementById('root'))
}

render()