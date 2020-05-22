import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.less'
import avatar from '@/images/avatar.jpg'

function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')
  const [hobby, setHobby] = useState([])

  useEffect(() => {
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

  return (
    <div className='container'>
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