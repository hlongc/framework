import React, { useEffect, useState } from 'react'
import { Link } from '../react-router-dom'

export default function Add(props) {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : []
    setUsers(users)
  }, []) // 第二个参数为依赖项，如果为空，则useEffect只执行一次，如果不传则每次都会执行
  return (
    <ol>
      {
        users.map((user, index) => {
          return <li key={index}><Link to={{ pathname: `/user/detail/${user.id}`, state: user }}>{user.name}</Link></li>
        })
      }
    </ol>
  )
}