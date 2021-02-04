import React from './react'
import { render } from './react-dom';

// react 17不在编译阶段依赖React这个包
// <div></div> jsx不会在转换为React.createElement()而是调用jsx的包

// react17里面对虚拟dom进行了Object.freeze()操作


function FunctionWelcome(props) {
  return (
    <div id="test" style={{ color: 'red', backgroundColor: 'yellow' }}>
      hello { props.name }
      <span className="span" style={{ color: 'blue' }}>world</span>
      { props.children }
    </div>
  )
}

render((
  <FunctionWelcome name="test">
    next one
  </FunctionWelcome>
), document.getElementById('root'))
