import React, { useReducer, useState } from 'react'

/**
 * hooks作者和redux作者是同一个人，所以风格类似
 * useState是useReducer的语法糖
 */

const ADD = 'ADD'
const MINUS = 'MINUS'

// funtion useReducer(reducer, initialState) {
//   const [state, setState] = useState(initialState)

//   function dispatch(action) {
//     const nextState = reducer(state, action)
//     setState(nextState)
//   }

//   return [state, dispatch]
// }

function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { ...state, number: state.number + 1 }
    case MINUS:
      return { ...state, number: state.number - 1 }
    default:
      return state
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { number: 0 })
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: ADD })}>+</button>
      <button onClick={() => dispatch({ type: MINUS })}>-</button>
    </div>
  )
}