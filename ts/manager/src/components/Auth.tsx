import React from 'react'
import { Redirect } from 'react-router-dom'

const Auth: React.FC = () => {
  const token = sessionStorage.getItem('token')
  console.log(sessionStorage.getItem('token'))
  if (token) return null
  return <Redirect to='/login' />
}

export default Auth