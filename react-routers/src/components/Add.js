import React, { useRef, useEffect } from 'react'

export default function Add(props) {
  const ref = useRef()
  function handleSubmit() {
    const users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : []
    users.push({ id: new Date().getTime() + '', name: ref.current.value })
    sessionStorage.setItem('users', JSON.stringify(users))
    props.history.push('/user/list')
  }
  useEffect(() => {
    ref.current.focus()
  }, [])
  return (
    <form onSubmit={handleSubmit}>
      <input ref={ref} type="text" />
      <input type="submit" />
    </form>
  )
}