import React from './react'
import ReactDOM from './react-dom'

function handleClick(e) {
  e.persist()
  setTimeout(() => {
    console.log(e)
  }, 1000)
}

const style = { border: '1px solid red', margin: '5px' }
const ele = (
  <div style={style} onClick={handleClick}>
    A
    <div style={style}>
      B
      <div style={style}>B1</div>
      <div style={style}>B2</div>
    </div>
    <div style={style}>
      C
      <p style={style}>C1</p>
      <p style={style}>C2</p>
    </div>
  </div>
)

ReactDOM.render(ele, document.getElementById('root'))