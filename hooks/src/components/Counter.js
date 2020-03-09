import React, { useState, useCallback } from 'react'

function Sum() {
  console.log('日志')
  return { number: 0 }
}

let prevAdd

function Child({ data, addClick }) {
  return (
    <div>
      <p>{data.number}</p>
      <button onClick={addClick}>子组件增加</button>
    </div>
  )
}

export default function Counter() {
  // const [counter, setCounter] = useState(Sum())  // 这样初始化sum每次都会执行，会打印多次日志
  const [state, setState] = useState(() => Sum()) // 而这样初始化，sum只会执行一次 

  const [value, setValue] = useState('')

  // useCallback 第二个参数是该回调的依赖项，如果依赖项没发生改变，则返回的函数和之前相同，反之不相同;不传入第二个参数，则返回的函数每次都改变
  // 比如value改变了，但是state没变，则add函数和之前一样
  const add = useCallback(() => {
    setState(prevState => ({ number: prevState.number + 1 }))
  }, [state])
  console.log('prevAdd === add', prevAdd === add)
  prevAdd = add

  const data = { number: state.number }

  return (
    <div>
      <p>{state.number}</p>
      <button onClick={add}>+</button>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <Child data={data} addClick={add} />
    </div>
  )
}