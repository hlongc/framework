import React, { useState } from 'react'
import ReactDom from 'react-dom'

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
  let tmpState
  if (initFn && typeof initFn === 'function') {
    tmpState = initFn(initArgs)
  } else {
    tmpState = initArgs
  }
  const [state, setState] = useState(tmpState)
  function dispatch(action) {
    const newState = reducer(state, action)
    setState(newState)
  }

  return [state, dispatch]
}



function Counter() {
  const [state, dispatch] = useReducer(reducer, 0, func)
  console.log('用useState实现useReducer', state)
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: ADD })}>加</button>
      <button onClick={() => dispatch({ type: MINUS })}>减</button>
    </div>
  )
}

ReactDom.render(<Counter />, document.getElementById('root'))