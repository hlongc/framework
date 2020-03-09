import React, { useState, useCallback, memo, useMemo } from 'react'

function Child({ data, addClick }) {
  console.log('子组件改变')
  return (
    <div>
      <p>{data.number}</p>
      <button onClick={addClick}>子组件增加</button>
    </div>
  )
}

// 用memo包装子组件，当子组件所依赖的属性不发生改变时，不会重新渲染，就像PureComponent
const MyChild = memo(Child)

export default function Num() {
  const [state, setState] = useState({ number: 0 })
  const [value, setValue] = useState('')

  const add = useCallback(() => {
    setState(prevState => ({ number: prevState.number + 1 }))
  }, [state])
  
  // useMemo 封装对象，当对象所依赖的值未发生改变时，重新渲染以后还是之前的对象
  const data = useMemo(() => ({ number: state.number }), [state])
  console.log('父组件改变')
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={add}>父组件增加</button>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <MyChild data={data} addClick={add} />
    </div>
  )
}