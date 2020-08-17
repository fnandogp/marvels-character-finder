import { Form, Input, Button, Card, PageHeader } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import router from 'next/router';
import { Magic } from 'magic-sdk';
import axios from 'axios';
import Layout from '../components/layout';
import useUser from '../hooks/useUser';

const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: true });

  const onFinish = async (values) => {
    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      const didToken = await magic.auth.loginWithMagicLink({
        email: values.email,
      });

      const body = { email: values.email };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${didToken}`,
      };
      const res = await axios.post('/api/login', body, { headers });

      if (res.status === 200) {
        router.push('/characters');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: 300, margin: 'auto' }}>
        <PageHeader title="Login" />

        <Card>
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your E-mail!' }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="E-mail"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in / Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
