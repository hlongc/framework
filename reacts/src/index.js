import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Wecome(props) {
  function parentClick(e) {
    console.log('父组件', e)
  }
  function childClick(e) {
    e.persist()
    setTimeout(() => {
      console.log('子组件', e)
    }, 2000)
  }
  return <div id={props.id} style={props.style} onClick={parentClick}>
    函数式组件
    <span style={{ float: 'right' }} onClick={childClick}>welcome to china</span>
  </div>
}

class Welcome extends Component {
  render() {
    return <div id={this.props.id} style={this.props.style}>
      我是类组件
      {
        React.createElement('div', { id: 'container', style: { color: 'red' } }, React.createElement('span', { id: 'box1', style: { color: 'deepskyblue' } }, 'hello'), React.createElement('span', { id: 'box2', className: 'container' }, 'world'))
      }
    </div>
  }
}

// const element = React.createElement('div', { id: 'container', style: { color: 'red' } }, React.createElement('span', { id: 'box1', style: { color: 'deepskyblue' } }, 'hello'), React.createElement('span', { id: 'box2', className: 'container' }, 'world'))

const element = React.createElement(Wecome, { id: 'weblcomeClass', style: { color: 'red', backgroundColor: 'green' } })

console.log(element)
// debugger
ReactDOM.render(
  element
  , document.getElementById('root')
);
