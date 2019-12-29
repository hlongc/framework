import React from 'react';
import ReactDOM from 'react-dom';

// babel会把jsx <h1>hello</h1>转化为 => React.createElement('h1', null, 'hello')
const element1 = React.createElement('h1', { id: 'hello', className: 'hah', style: { color: 'red' } }, 'hello')

/**
 * 类组件渲染的时候，通过new Component的方式来创建实例，并且将props对象传入到构造函数中
 * 然后调用实例的render方法获取到返回的React元素
 * 最后渲染到页面上
 */
class Box extends React.Component {
  render() {
    return <div>我是box</div>
  }
}
/**
 * 函数组件唯一的参数就是props对象，然后返回一个React元素
 * 然后调用ReactDOM.render()方法转换为真实元素渲染到页面上
 * @param {Object} props 属性对象
 */
function Greet(props) {
  return <span style={{ color: props.color }}>我是什么颜色</span>
}

ReactDOM.render(
  <div>
    { element1 }
    <Box />
    <Greet color="red" />
  </div>
  , document.getElementById('root'));
