import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { FormItemProps, FormProps } from 'antd/lib/form'
import { RouteComponentProps } from 'react-router-dom'
import { IUser } from '@/types'
import './style.less'

const tailLayout = {
  wrapperCol: { offset: 10, span: 12 }
}

interface MapDispatchToProps {
  login: (user: IUser) => void;
  logout: () => void;
}

type LoginProps = FormItemProps & FormProps & RouteComponentProps & MapDispatchToProps

const Login: React.FC<LoginProps> = props => {
  useEffect(() => {
    props.logout()
  }, [])

  const onFinish = (values: any) => {
    if (values.username === 'admin' && values.password === '123456') {
      props.login({ username: 'admin' })
      props.history.push('/dashboard')
    } else {
      message.error('用户名或者密码错误')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }
  
  return (
    <div className='login-container'>
      <Form
        layout='vertical'
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='密码'
          name='password'
          rules={[
            { required: true, message: '请输入密码!' },
            { max: 16, min: 6, message: '密码长度为6-16位' }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>登录</Button>
          {/* <Button type='primary' style={{ marginLeft: 15 }}>注册</Button> */}
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login