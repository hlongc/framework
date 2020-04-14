import React from 'react'
import { Link } from '../react-router-dom'

export default class List extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    const users = sessionStorage.getItem('users') ? JSON.parse(sessionStorage.getItem('users')) : []
    this.setState({ users })
  }

  render() {
    return (
      <ul>
        {
          this.state.users.map(item => {
            return <li key={item.id}><Link to={`/user/detail/${item.id}`}>{item.username}</Link></li>
          })
        }
      </ul>
    )
  }
}