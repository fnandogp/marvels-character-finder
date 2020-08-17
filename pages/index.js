import React from 'react';
import Link from 'next/link';
import { Result, Button, Card } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Layout from '../components/layout';
import useUser from '../hooks/useUser';

const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <Card style={{ marginTop: '1rem' }}>
        <Result
          icon={<SmileOutlined />}
          title="Welcome!"
          subTitle="Start searching for characters right now."
          extra={[
            user && (
              <Link href="/characters" key="characters">
                <Button type="primary">Go To Character Finder</Button>
              </Link>
            ),
            !user && (
              <Link href="/login" key="login">
                <Button type="primary">Login</Button>
              </Link>
            ),
          ]}
        />
      </Card>
    </Layout>
  );
};

export default Home;
