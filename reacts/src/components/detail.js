import React from 'react'
import { debounce } from 'lodash'

export default class Detail extends React.Component {
  state = {
    user: {}
  }

  handleClick = () => {
    console.log('click')
  }

  componentDidMount() {
    this.debounceClick = debounce(this.handleClick, 2000, { leading: true })
    const id = this.props.match.params.id
    const users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : []
    const user = users.find(item => item.id === id)
    this.setState({ user })
  }

  render() {
    return (
      <div>
        <button onClick={this.debounceClick}>点击</button>
        <p>ID: {this.state.user.id}</p>
        <p>姓名: {this.state.user.username}</p>
      </div>
    )
  }
}