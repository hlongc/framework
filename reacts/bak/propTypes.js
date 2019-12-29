import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      { count }
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}

class Box extends Component {
 static porpTypes = { // 属性类型校验
   color: PropTypes.string.isRequired,
   age: PropTypes.number
 }

 static defaultProps = { // 属性默认值
  age: 0
 }
 
 render() {
   return <p style={{ color: this.props.color }}>我是带颜色的段落 年龄: { this.props.age }</p>
 }
}

ReactDOM.render(
  <div>
    <Box color="red" />
    <Counter />
  </div>
  , document.getElementById('root'));
