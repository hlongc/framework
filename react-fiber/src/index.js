import React from './react'
import ReactDOM from './react-dom'


class Counter extends React.Component {
  state = {
    count: 0
  }
  handleClick = (e) => {
    console.log(e)
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }
  render() {
    return (
      <div>
        { this.props.name }
        <p>{ this.state.count }</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter name="计数器" />, document.getElementById('root'))

// function handleClick(e) {
//   e.persist()
//   setTimeout(() => {
//     console.log(e)
//   }, 1000)
// }

// const style = { border: '1px solid red', margin: '5px' }
// const ele = (
//   <div style={style}>
//     A
//     <div style={style}>
//       B
//       <div style={style}>B1</div>
//       <div style={style}>B2</div>
//     </div>
//     <div style={style}>
//       C
//       <p style={style}>C1</p>
//       <p style={style}>C2</p>
//     </div>
//   </div>
// )

// ReactDOM.render(ele, document.getElementById('root'))

// const btn1 = document.getElementById('btn1')
// const btn2 = document.getElementById('btn2')

// btn1.addEventListener('click', () => {
//   const style = { border: '1px solid green', margin: '5px' }
//   const ele = (
//     <div id="A" style={style}>
//       A
//       <div id="B" style={style}>
//         B
//         <div id="B1" style={style}>B1</div>
//         <div id="B2" style={style}>B2</div>
//       </div>
//       <div id="C" style={style}>
//         C
//         <p id="C1" style={style}>C1</p>
//         <p id="C2" style={style}>C2</p>
//         <p id="C3" style={style}>C3</p>
//       </div>
//     </div>
//   )

//   ReactDOM.render(ele, document.getElementById('root'))
// })

// btn2.addEventListener('click', () => {
//   const style = { border: '1px solid deepskyblue', margin: '5px' }
//   const ele = (
//     <div id="A" style={style}>
//       A
//       <div id="B" style={style}>
//         B
//         <div id="B1" style={style}>B11</div>
//         <div id="B2" style={style}>B22</div>
//       </div>
//       <div id="C" style={style}>
//         C
//         <p id="C1" style={style}>C11</p>
//       </div>
//     </div>
//   )

//   ReactDOM.render(ele, document.getElementById('root'))
// })