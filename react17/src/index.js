import React, { useState } from './react'
import { render } from './react-dom';

function Counter() {
  const [count, setCount] = useState(0)
  const delayAdd = () => {
    setTimeout(() => {
      setCount(prev => prev + 1)
    }, 2000)
  }
  return (
    <div>
      <p>{ count }</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={delayAdd}>delay+</button>
    </div>
  )
}

render(<Counter />, document.getElementById('root'))