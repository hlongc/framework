import React from 'react'
import { connect } from './react-redux'
import actions from './actions'

function Counter(props) {
  return (
    <div>
      <p>{props.count}</p>
      <button onClick={props.add}>+</button>
      <button onClick={props.minus}>-</button>
      <button onClick={props.thunk}>thunk</button>
      <button onClick={props.promise}>promise</button>
    </div>
  )
}

Counter = connect(
  state => state.counter1,
  actions
)(Counter)

export default Counter