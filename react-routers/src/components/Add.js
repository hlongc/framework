import React, { useRef, useEffect, useState } from 'react'
import { Prompt } from '../react-router-dom'

export default function Add(props) {
  // 当输入框有内容时，但是要跳转路由，可以提醒用户是否跳转
  const [isBlock, setBlock] = useState(false)
  const [submit, setSubmit] = useState(false)
  const ref = useRef()

  function handleSubmit() {
    setBlock(false)
    setSubmit(true)
  }

  useEffect(() => {
    if (submit) {
      const users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : []
      users.push({ id: new Date().getTime() + '', name: ref.current.value })
      sessionStorage.setItem('users', JSON.stringify(users))
      props.history.push('/user/list')
    }
  }, [submit])

  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <>
      <Prompt when={isBlock} message={to => `确定要跳转到${to.pathname}吗？`} />
      <form onSubmit={handleSubmit}>
        <input ref={ref} type="text" onChange={e => setBlock(e.target.value.length > 0)} />
        <input type="submit" />
      </form>
    </>
  )
}