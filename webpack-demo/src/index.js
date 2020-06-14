import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.less'
import avatar from '@/images/avatar.jpg'
import { add, sub } from './common'
import Child from './Child'

function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')
  const [hobby, setHobby] = useState([])
  const childRef = useRef()

  useEffect(() => {
    console.log(add(1, 100))
    console.log('count', count)
  }, [count])

  async function getHobby() {
    try {
      const res = await axios.get('/api/hobby')
      if (res.data && res.data.success) {
        setHobby(res.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function fetchData() {
    try {
      const res = await axios.get('/mock/info')
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  function handleClick() {
    setCount(count + 1)
  }

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleChildClick() {
    childRef.current.focus()
  }

  function greet() {
    childRef.current.greet()
  }

  function onChange(a, b, c) {
    console.log(a, b, c)
  }

  return (
    <div className='container'>
      <p className='test'>绿色的1字</p>
      <p className='demo'>测试demo</p>
      <p className='foo'>嘻嘻哈哈</p>
      <button onClick={handleChildClick}>触发子元素的聚焦</button>
      <button onClick={greet}>子元素打个招呼</button>
      <Child ref={childRef} />
      <div className='empty'></div>
      <p>{ count }</p>
      <button onClick={fetchData}>获取数据</button>
      <img src={avatar} />
      <p>爱好：</p>
      <button onClick={getHobby}>看下爱好</button>
      <ul>
        { hobby.map(item => <li key={item}>{item}</li>) }
      </ul>
      <button onClick={handleClick}>+</button>
      <input value={value} onChange={handleChange} placeholder='请输入' />
      <p>{ value }</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}