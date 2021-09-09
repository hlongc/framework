import React from 'react'
// import { withRouter } from '../react-router-dom'
import { withRouter } from '../pratice/react-router-dom'
import Counter from './Counter'

class NavBar extends React.Component {
  render() {
    return (
      <div>
        {this.props.title}
        <button onClick={() => this.props.history.push('/user')}>去user</button>
        <Counter />
      </div>
    )
  }
}


export default withRouter(NavBar)