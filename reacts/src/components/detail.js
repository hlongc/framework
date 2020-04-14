import React from 'react'

export default class Detail extends React.Component {
  state = {
    user: {}
  }

  componentDidMount() {
    const id = this.props.match.params.id
    const users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : []
    const user = users.find(item => item.id === id)
    this.setState({ user })
  }

  render() {
    return (
      <div>
        <p>ID: {this.state.user.id}</p>
        <p>姓名: {this.state.user.username}</p>
      </div>
    )
  }
}