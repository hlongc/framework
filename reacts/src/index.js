import React, { Component } from './react';
import ReactDOM from './react-dom';

// function Wecome(props) {
//   function parentClick(e) {
//     console.log('父组件', e)
//   }
//   function childClick(e) {
//     e.persist()
//     setInterval(() => {
//       console.log('子组件', e)
//     }, 2000)
//   }
//   return <div id={props.id} style={props.style} onClick={parentClick}>
//     函数式组件
//     <span style={{ float: 'right' }} onClick={childClick}>welcome to china</span>
//   </div>
// }

class Welcome extends Component {

  state = {
    count: 1
  }

  handleClick = e => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }

  render() {
    return <button onClick={this.handleClick}>{this.state.count}</button>
  }
}

// const element = React.createElement('div', { id: 'container', style: { color: 'red' } }, React.createElement('span', { id: 'box1', style: { color: 'deepskyblue' } }, 'hello'), React.createElement('span', { id: 'box2', className: 'container' }, 'world'))

const element = React.createElement(Welcome, { id: 'weblcomeClass', style: { color: 'red', backgroundColor: 'green' } })

console.log(element)
// debugger
ReactDOM.render(
  element
  , document.getElementById('root')
);
 