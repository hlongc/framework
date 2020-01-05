import React, { useContext, createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'

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

