import React from './react';
import ReactDOM from './react-dom';

const element = React.createElement('div', { id: 'container', style: { color: 'red' } }, React.createElement('span', { id: 'box1', style: { color: 'deepskyblue' } }, 'hello'), React.createElement('span', { id: 'box2', className: 'container' }, 'world'))

console.log(element)

ReactDOM.render(
  element
  , document.getElementById('root')
);
