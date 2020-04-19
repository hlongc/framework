import React, { useReducer } from 'react'
import ReactDom from 'react-dom'

function useState(initialState) {
  return useReducer((oldState, newState) => newState, initialState)
}

function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('迭代')
  console.log('通过useReducer实现useState')
  return (
    <div>
      <p>{name}: {count}</p>
      <button onClick={() => setCount(count + 1)}>加</button>
      <button onClick={() => setName('迭代' + Math.random())}>迭代</button>
    </div>
  )
}

ReactDom.render(<Counter />, document.getElementById('root'))