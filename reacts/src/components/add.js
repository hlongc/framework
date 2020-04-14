import React, { createRef } from 'react'

export default class Add extends React.Component {
  constructor() {
    super()
    this.input = createRef()
  }

  componentDidMount() {
    this.input.current.focus()
  }

  handleClick = () => {
    const username = this.input.current.value
    const id = new Date().getTime() + ''
    const users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : []
    users.push({ id, username })
    sessionStorage.setItem('users', JSON.stringify(users))
    this.input.current.value = ''
    this.input.current.focus()
  }

  render() {
    return (
      <div>
        <p><input ref={this.input} /></p>
        <button onClick={this.handleClick}>增加</button>
      </div>
    )
  }
}