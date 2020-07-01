import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '@/store/loginState/actions'
import { ILogin, IUser } from '@/types'

interface AuthProps {
  loginState: ILogin;
  login: (user: IUser) => void;
}

const Auth: React.FC<AuthProps> = (props) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    // 页面进行刷新以后，重新设置状态
    if (!props.loginState.login) {
      const username = sessionStorage.getItem('token')!.split('.')[1]
      props.login({ username })
    }
    return null
  }
  return <Redirect to='/login' />
}

const mapStateToProps = (state: any) => ({
  loginState: state.loginState
})

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)