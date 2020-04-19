import React from 'react'
import ReactDom from 'react-dom'

const memoizedStates = []
let index = 0

function useState(initialState) {
  // 如果之前有值就取之前的值，这发生在更新的时候
  // 如果之前没值就取初始值，发生在第一次调用初始化的时候
  memoizedStates[index] = memoizedStates[index] || initialState
  const currentIndex = index
  function setState(newState) {
    memoizedStates[currentIndex] = newState
    render()
  }
  return [memoizedStates[index++], setState]
}

function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('迭代')
  return (
    <div>
      <p>{name}: {count}</p>
      <button onClick={() => setCount(count + 1)}>加</button>
      <button onClick={() => setName('迭代' + Math.random())}>迭代</button>
    </div>
  )
}

function render() {
  index = 0 // 每次渲染的时候重置索引
  ReactDom.render(<Counter />, document.getElementById('root'))
}

render()