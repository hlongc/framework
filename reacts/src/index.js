import React, { Component } from './react';
import ReactDOM from './react-dom';

// function Welcome(props) {
//   return <div id={props.id} style={props.style}>函数式组件,welcome to china</div>
// }

class Welcome extends Component {
  render() {
    return <div id={this.props.id} style={this.props.style}>我是类组件</div>
  }
}

// const element = React.createElement('div', { id: 'container', style: { color: 'red' } }, React.createElement('span', { id: 'box1', style: { color: 'deepskyblue' } }, 'hello'), React.createElement('span', { id: 'box2', className: 'container' }, 'world'))

const element = React.createElement(Welcome, { id: 'weblcomeClass', style: { color: 'red', backgroundColor: 'green' } })

console.log(element)

ReactDOM.render(
  element
  , document.getElementById('root')
);
