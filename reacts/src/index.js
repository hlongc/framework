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

function FunctionComponent(props) {
  return <button a={props.count} onClick={props.handleClick}>{props.count}</button>
}

class ClassComponent extends Component {
  render() {
    return <button a={this.props.count} onClick={this.props.handleClick}>{this.props.count}</button>
  }
}

class Welcome extends Component {
  state = {
    show: false
  }
  handleClick = e => {
    this.setState(prevState => ({ show: !prevState.show }))
  }
  render() {
    return this.state.show ? (
      <ul onClick={this.handleClick}>
        <li key="A">A</li>
        <li key="B">B</li>
        <li key="C">C</li>
        <li key="D">D</li>
      </ul>
    ) : (
      <ul onClick={this.handleClick}>
        <li key="A">A</li>
        <li key="E">E</li>
        <li key="B">B</li>
        <li key="D">D</li>
        <li key="C">C</li>
      </ul>
    )
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
 