import React from 'react'
import { add1, add2, minus1, minus2, add } from './actions'
import { connect } from '../pratice/react-redux'
// import { connect, useSelector, useDispatch } from '../react-redux'


// function Counter1(props) {
//   const counter1 = useSelector(state => state.counter1)
//   const dispatch = useDispatch()
//   return (
//     <div>
//       <p>姓名: {counter1.name}, count: {counter1.count}</p>
//       <button onClick={() => dispatch(add1())}>add1</button>
//       <button onClick={() => dispatch(minus1())}>minus1</button>
//       <button onClick={() => dispatch(add())}>add</button>
//     </div>
//   )
// }



function Counter2(props) {
  return (
    <div>
      <p>姓名: {props.name}, count: {props.count}</p>
      <button onClick={props.add2}>add2</button>
      <button onClick={props.minus2}>minus2</button>
      <button onClick={props.add}>add</button>
    </div>
  )
}

Counter2 = connect(state => state.counter2, { add2, minus2, add })(Counter2)

export default function Counter() {
  return (
    <div>
      {/* <Counter1 /> */}
      <Counter2 />
    </div>
  )
}