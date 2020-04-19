import React, { useReducer } from 'react'
import ReactDom from 'react-dom'

const memoizedStates = []
let index = 0

function useState(initialState) {
  // 如果之前有值就取之前的值，这发生在更新的时候
  // 如果之前没值就取初始值，发生在第一次调用初始化的时候
  const currentIndex = index
  memoizedStates[currentIndex] = memoizedStates[currentIndex] || initialState
  function setState(newState) {
    memoizedStates[currentIndex] = newState
    render()
  }
  return [memoizedStates[index++], setState]
}

function useEffect(callback, dependencies) {
  // debugger
  if (!dependencies) { // 如果没有依赖则每次更新都执行
    index++
    return callback()
  }
  const lastDepend = memoizedStates[index]
  // 如果上一次没有依赖项，那么直接执行
  // 如果有依赖项，讲上次的依赖项和这次的依赖项进行比较，如果有一项不同就执行
  const changed = lastDepend ? dependencies.some((item, index) => item !== lastDepend[index]) : true
  if (changed) {
    memoizedStates[index] = dependencies
    callback()
  }
  index++
}

function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('hlc')

  useEffect(() => {
    console.log('只执行一次')
  }, [])

  useEffect(() => {
    console.log('每次都执行')
  })

  useEffect(() => {
    console.log('数量变化了')
  }, [count])

  useEffect(() => {
    console.log('名字变化了')
  }, [name])

  useEffect(() => {
    console.log('名字或者数量变化了')
  }, [name, count])

  return (
    <div>
      <p>{count}: {name}</p>
      <button onClick={() => setCount(count + 1)}>加</button>
      <button onClick={() => setName('hlc' + Math.random())}>改变名字</button>
    </div>
  )
}

function render() {
  ReactDom.render(<Counter />, document.getElementById('root'))
  index = 0
}

render()