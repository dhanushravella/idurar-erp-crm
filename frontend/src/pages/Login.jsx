import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, Space, Layout, Row, Col, Divider } from 'antd';
import { Typography } from 'antd';

import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import AuthLayout from '@/layout/AuthLayout';

import logo from '@/style/images/logo.png';

const { Content } = Layout;
const { Title, Text } = Typography;

const SideContent = () => {
  return (
    <Content
      style={{
        padding: '150px 30px 30px',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
      }}
      className="sideContent"
    >
      <div style={{ width: '100%' }}>
        <img src={logo} alt="Logo" style={{ margin: '0 auto 40px', display: 'block' }} />
        <div className="space40"></div>
        <Title level={3}>Manage your employees with :</Title>
        <div className="space20"></div>
        <ul className="list-checked">
          <li className="list-checked-item">
            <Space direction="vertical">
              <Text strong>Employee Self Service tool</Text>
            </Space>
          </li>

          <li className="list-checked-item">
            <Space direction="vertical">
              <Text strong>Easily add &amp; manage your employee services</Text>
              <Text>It brings together your tasks, projects, timelines, files and more</Text>
            </Space>
          </li>
        </ul>
      </div>
    </Content>
  );
};

const LoginPage = () => {
  const { loading: isLoading } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(login({ loginData: values }));
  };
  return (
    <>
      <AuthLayout sideContent={<SideContent />}>
        <Content
          style={{
            padding: '200px 30px 30px',
            maxWidth: '440px',
            margin: '0 auto',
          }}
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
            <img
              src={logo}
              alt="Logo"
              style={{
                margin: '-70px auto 40px',
                display: 'block',
              }}
            />
            <div className="space50"></div>
          </Col>
          <Title level={1}>Sign in</Title>

          <Divider />
          <div className="site-layout-content">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <LoginForm />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={isLoading}
                  size="large"
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </AuthLayout>
    </>
  );
};

export default LoginPage;
