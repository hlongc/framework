import React from 'react'
import { withRouter } from '../react-router-dom'

function GoHome(props) {
  return (
    <span onClick={() => props.history.push('/')} style={{ cursor: 'pointer' }}>{props.children}</span>
  )
}

export default withRouter(GoHome)