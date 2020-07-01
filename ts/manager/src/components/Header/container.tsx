import React from 'react'
import { Avatar, Row, Col } from 'antd'
import { ILogin } from '@/types'
import './style.less'

interface HeaderProps {
  loginState: ILogin
}

const Header: React.FC<HeaderProps> = (props) => {

  return <>
    {
      props.loginState.login &&
      <Row className='hlc-header' justify='space-around'>
        <Col span={22} className='header-left'>Placeholder</Col>
        <Col span={2} className='header-right'>
          <Avatar
            shape='square'
            className='avatar' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <span>{ props.loginState.user.username }</span>
        </Col>
      </Row>
    }
  </>
}

export default Header