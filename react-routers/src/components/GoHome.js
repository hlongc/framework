import React from 'react'
import { withRouter } from '../react-router-dom'

function GoHome(props) {
  return (
    <span onClick={() => props.history.push('/')} style={{ cursor: 'pointer' }}>回家</span>
  )
}

export default withRouter(GoHome)