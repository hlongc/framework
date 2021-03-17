import React, { useReducer, useState, useContext, createContext } from './react'
import { render } from './react-dom';

const CountContext = createContext()
const ADD = 'ADD'
const MINUS = 'MINUS'

const initState = { num: 0 }

function reducer(state = initState, action) {
  switch(action.type) {
    case ADD:
      return { ...state, num: state.num + 1 }
    case MINUS:
      return { ...state, num: state.num - 1 }
    default:
      return state
  }
}

function Parent() {
  const { state, dispatch } = useContext(CountContext)
  const [count, setCount] = useState(666)
  return (
    <div>
      <p>count: { count }</p>
      <button onClick={() => setCount(count + 1)}>count+</button>
      <p>num: {state.num}</p>
      <button onClick={() => dispatch({ type: ADD })}>+</button>
      <button onClick={() => dispatch({ type: MINUS })}>-</button>
    </div>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, { num: 10 })
  const value = { state, dispatch }
  return (
    <CountContext.Provider value={value}>
      <Parent />
    </CountContext.Provider>
  )
}

render(<App />, document.getElementById('root'))
