import React, { useState } from 'react'
import ReactDom from 'react-dom'

function Counter() {
  debugger
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>加</button>
    </div>
  )
}

ReactDom.render(<Counter />, document.getElementById('root'))