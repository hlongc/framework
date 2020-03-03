import React from 'react'

export default function Detail(props) {
  let user = props.location.state
  if (!user) {
    const users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : []
    user = users.find(user => user.id === props.match.params.id)
  }
  return (
    <div>
      <p>ID：{user.id}</p>
      <p>姓名：{user.name}</p>
    </div>
  )
}