import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'

// 函数的实现方式
function createContext() {
  const context = {}
  function Provider(props) {
    context.value = props.value
    return props.children
  }
  function Consumer(props) {
    return props.children(context.value)
  }
  context.Provider = Provider
  context.Consumer = Consumer
  return context
}

function useContext(context) {
  return context.value
}
// 类的实现方式
// function createContext() {
//   let context = {}
//   class Provider extends React.Component {
//     render() {
//       context = this.props.value
//       return this.props.children
//     }
//   }
//   class Consumer extends React.Component {
//     render() {
//       return this.props.children(context)
//     }
//   }
//   return {
//     Provider,
//     Consumer
//   }
// }

const ColorContext = createContext()

function ChildOne() {
  const theme = useContext(ColorContext)
  const style = {
    border: `2px solid ${theme.color}`
  }
  return (
    <div style={style}>
      <p>子元素1</p>
      <button onClick={() => theme.setColor('red')}>边框变红</button>
    </div>
  )
}


function ChildTwo() {
  const theme = useContext(ColorContext)
  const style = {
    border: `2px solid ${theme.color}`
  }
  return (
    <div style={style}>
      <p>子元素2</p>
      <button onClick={() => theme.setColor('green')}>边框变绿</button>
    </div>
  )
}

// function ChildOne() {
//   return (
//     <ColorContext.Consumer>
//       {
//       value => (
//         <div style={{ border: `2px solid ${value.color}` }}>
//           <p>子元素1</p>
//           <button onClick={() => value.setColor('red')}>边框变红</button>
//         </div>
//       )
//     }
//     </ColorContext.Consumer>
//   )
// }

// function ChildTwo() {
//   return (
//     <ColorContext.Consumer>
//       {
//       value => (
//         <div style={{ border: `2px solid ${value.color}` }}>
//           <p>子元素2</p>
//           <button onClick={() => value.setColor('green')}>边框变绿色</button>
//         </div>
//       )
//     }
//     </ColorContext.Consumer>
//   )
// }

function Container(props) {
  const [color, setColor] = useState('red')
  return (
    <ColorContext.Provider value={{ color, setColor }}>
      <div style={{ border: `2px solid ${color}` }}>
        <ChildOne />
        <ChildTwo />
      </div>
    </ColorContext.Provider>
  )
}

ReactDOM.render(
  <Container />
  , document.getElementById('root')
);

