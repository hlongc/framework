import React, { useRef } from 'react'

export default function Login(props) {
  const ref = useRef()
  function submit(e) {
    e.preventDefault()
    sessionStorage.setItem('login', ref.current.value)
    if (props.location.state) {
      props.history.push(props.location.state.from)
    } else {
      props.history.push('/')
    }
  }
  return (
    <form onSubmit={submit}>
      姓名: <input type="text" ref={ref} />
      <input type="submit" />
    </form>
  )
}