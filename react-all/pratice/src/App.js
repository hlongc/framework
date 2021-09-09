import { connect } from './react-redux'
import { add1, add2, add3, edit, reset } from './action'
import Test from './Test'
import { memo } from 'react'

const MemoTest = memo(Test)

function App(props) {
  return (
    <div>
      { props.counter.count > 3 ? null : <MemoTest /> }
      <p>{ props.counter.count }</p>
      <button onClick={props.add1}>+1</button>
      <button onClick={props.add2}>+2</button>
      <button onClick={props.add3}>+3</button>
      <hr></hr>
      <p>{ props.user.name }</p>
      <button onClick={props.edit}>edit</button>
      <button onClick={props.reset}>reset</button>
    </div>
  )
}

export default connect(
  state => state,
  { add1, add2, add3, edit, reset }
)(App)