import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less';
import Layout from 'antd/lib/layout/layout';
import CommonButton from '../../components/common/button/CommonButton';

const { Password } = Input;

const FormItem = Form.Item;

function LoginPage(props: any) {
  // const { logo } = props;

  return (
    <Layout className="loginPage">
      <div className="content">
        <Form className="loginForm">
          <FormItem name="username">
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </FormItem>
          <FormItem name="password">
            <Password prefix={<LockOutlined />} placeholder="请输入密码" />
          </FormItem>
          <FormItem className="loginBar">
            <FormItem name="rememberMe" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </FormItem>
            <a href="/#">忘记密码？</a>
          </FormItem>
          <FormItem>
            <CommonButton className="loginBtn" type="primary">登录</CommonButton>
          </FormItem>
        </Form>
      </div>
    </Layout>
  );
}

export default LoginPage;
