import React, { Component, createRef, useRef } from 'react';
import ReactDOM from 'react-dom';

/**
 * ref 字符串用法 已经被废弃
 */
// class Focus extends Component {
//   handleClick = () => {
//     this.refs.inp.focus()
//   }
//   render() {
//     return (
//       <div>
//         <input type="text" ref="inp" />
//         <button onClick={this.handleClick}>聚焦</button>
//       </div>
//     )
//   }
// }

/**
 * ref={inp => this.input = inp} 函数用法， inp作为函数的参数,inp为真实dom元素，然后赋值给this.input
 * 不推荐这种写法
 */
// class Focus extends Component {
//   handleClick = () => {
//     this.input.focus()
//   }
//   render() {
//     return (
//       <div>
//         <input type="text" ref={inp => this.input = inp} />
//         <button onClick={this.handleClick}>聚焦</button>
//       </div>
//     )
//   }
// }

/**
 * this.input = createRef() 得到一个对象，只包含一个current属性
 * ref={this.input} 此处把真实dom元素赋值给current属性
 */
// class Focus extends Component {
//   constructor() {
//     super()
//     this.input = createRef() // { current: null }
//   }
//   handleClick = () => {
//     this.input.current.focus()
//   }
//   render() {
//     return (
//       <div>
//         <input type="text" ref={this.input} />
//         <button onClick={this.handleClick}>聚焦</button>
//       </div>
//     )
//   }
// }

/**
 * 函数式组件使用useRef也是得到一个{ current: null }
 */
function Focus() {
  const input = useRef()
  function handleClick() {
    input.current.focus()
  }
  return (
    <div>
      <input type="text" ref={input} />
      <button onClick={handleClick}>聚焦</button>
    </div>
  )
}

ReactDOM.render(
  <Focus />
  , document.getElementById('root')
);