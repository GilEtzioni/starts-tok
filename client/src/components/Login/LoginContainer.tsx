import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

interface LoginFormProps {
  onLogin: (values: LoginFormValues) => void;
}

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const LoginContainer: React.FC<LoginFormProps> = ({ onLogin }) => {
  const onFinish = (values: LoginFormValues) => {
    console.log('Form values:', values);
    onLogin(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error('Form submission failed:', errorInfo);
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ maxWidth: 400, margin: 'auto', marginTop: '50px' }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" style={{ textAlign: 'left' }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginContainer;
