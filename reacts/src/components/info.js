import React from 'react'
import { withRouter } from '../react-router-dom'


function Demo(props) {
  function handleClick() {
    console.log(props)
    props.history.push('/user/list')
  }
  return <span onClick={handleClick}>点击去用户列表</span>
}

Demo = withRouter(Demo)

export default function Info() {
  return <div>
    <Demo />
  </div>
}