import React, { Component } from './react';
import ReactDOM from './react-dom';

// function Welcome(props) {
//   return <div id={props.id} style={props.style}>函数式组件,welcome to china</div>
// }

function Child() {
  return <div>我是child</div>
}

class Welcome extends Component {
  render() {
    return <Child />
  }
}

// const element = React.createElement('div', { id: 'container', style: { color: 'red' } }, React.createElement('span', { id: 'box1', style: { color: 'deepskyblue' } }, 'hello'), React.createElement('span', { id: 'box2', className: 'container' }, 'world'))

const element = React.createElement(Welcome)

console.log(element)

ReactDOM.render(
  element
  , document.getElementById('root')
);
