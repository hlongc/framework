import React from './react'
import ReactDOM from './react-dom'

const style = {
  margin: '5px',
  border: '5px solid red'
}

const element = (
  <div id="A1" style={style}>
    A1
    <div id="B1" style={style}>B1</div>
    <div id="B2" style={style}>
      B2
      <div id="C1" style={style}>C1</div>
      <div id="C2" style={style}>C2</div>
    </div>
  </div>
)
ReactDOM.render(element, document.getElementById('root'))

const increase = document.getElementById('increase')
increase.addEventListener('click', () => {
  const style = {
    margin: '5px',
    border: '5px solid green'
  }
  const element = (
    <div id="A1-new" style={style}>
      A1-new
      <div id="B1-new" style={style}>B1-new</div>
      <div id="B2-new" style={style}>
        B2-new
        <div id="C1-new" style={style}>C1-new</div>
        <div id="C2-new" style={style}>C2-new</div>
      </div>
      <div id="B3-new" style={style}>B3-new</div>
    </div>
  )
  ReactDOM.render(element, document.getElementById('root'))
})

const decrease = document.getElementById('decrease')
decrease.addEventListener('click', () => {
  const style = {
    margin: '5px',
    border: '5px solid deepskyblue'
  }
  const element = (
    <div id="A1-new2" style={style}>
      A1-new2
      <div id="B1-new2" style={style}>B1-new2</div>
      <div id="B2-new2" style={style}>
        B2-new2
        <div id="C1-new2" style={style}>C1-new2</div>
        <div id="C2-new2" style={style}>C2-new2</div>
      </div>
    </div>
  )
  ReactDOM.render(element, document.getElementById('root'))
})