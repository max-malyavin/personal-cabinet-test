import React from 'react'
import './Login.scss'
import { Form, Input, Button, Alert } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const Login = ({login,failed}) => {

    const onFinish = values => {
        const { username, password} = values
        login(username,password)
      };
 
    return (
        <div className='login'>
            <div className='login-block'>
            
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <div className="welcome">Добро пожаловать!</div>
        <Form.Item name="username"
            rules={[
            {
                required: true,
                message: 'Пожалуйста введите логин',
            },]}>

        <Input size={'large'}
     prefix={<UserOutlined className="site-form-item-icon" />} 
     placeholder="Логин" />
      </Form.Item>
      <Form.Item name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите пароль',
          },]}>

        <Input size={'large'}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
         Войти в аккаунт
        </Button>
      </Form.Item>

      {failed && <Alert message="Ошибка" description="Неправильный логин или пароль" 
       type="info"
         showIcon/>}
    </Form>
    </div>
        </div>
    )
}

export default Login
