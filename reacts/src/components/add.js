import React, { createRef } from 'react'
import { Prompt } from '../react-router-dom'

export default class Add extends React.Component {
  constructor() {
    super()
    this.input = createRef()
    this.state = {
      isBlocking: false,
      value: ''
    }
  }

  componentDidMount() {
    this.input.current.focus()
  }

  handleClick = () => {
    this.setState({ isBlocking: false })
    const username = this.state.value
    const id = new Date().getTime() + ''
    const users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : []
    users.push({ id, username })
    sessionStorage.setItem('users', JSON.stringify(users))
    this.setState({ value: '' })
    this.input.current.focus()
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
    const isBlocking = !!e.target.value
    this.setState({ isBlocking })
  }

  render() {
    return (
      <div>
        <Prompt when={this.state.isBlocking} message={location => `你确定要跳往${location.pathname}吗？`} />
        <p><input ref={this.input} value={this.state.value} onChange={this.handleChange} /></p>
        <button onClick={this.handleClick}>增加</button>
      </div>
    )
  }
}