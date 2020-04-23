import React, { createRef } from 'react'

export default class Login extends React.Component {
  constructor() {
    super()
    this.input = createRef()
  }
  login = () => {
    const username = this.input.current.value
    if (!username) return
    sessionStorage.setItem('username', username)
    this.props.history.push('/user')
  }
  render() {
    return (
      <div>
        <input ref={this.input} />
        <p><button onClick={this.login}>登录</button></p>
      </div>
    )
  }
}