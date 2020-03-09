import React, { useEffect, useReducer } from 'react'

const ADD = 'ADD'
const MINUS = 'MINUS'

function reducer(state, action) {
  switch(action.type) {
    case ADD:
      return state + 1
    case MINUS:
      return state - 1
    default:
      return state
  }
}

function useLogger(reducer, initState, initializer) {
  const [state, oldDispatch] = useReducer(reducer, initState, initializer)
  const dispatch = action => {
    console.log('prevState', state)
    oldDispatch(action)
  }
  useEffect(() => {
    console.log('nextState', state)
  }, [state])
  return [state, dispatch]
}

export default function App() {
  const [num, dispatch] = useLogger(reducer, 0)
  return (
    <div>
      <p>{num}</p>
      <button onClick={() => dispatch({ type: ADD })}>+</button>
      <button onClick={() => dispatch({ type: MINUS })}>-</button>
    </div>
  )
}