import { Layout as AntdLayout, Typography, Menu } from 'antd';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import Head from 'next/head';
import useUser from '../hooks/useUser';

const { Header, Footer, Content } = AntdLayout;
const { Text, Link } = Typography;

function Layout({ children }) {
  const user = useUser();

  return (
    <AntdLayout>
      <Head>
        <title> Character Finder - Marvel </title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Header>
        <div style={{ float: 'left' }}>
          <NextLink href="/">
            <a>
              <img
                style={{ height: '40px' }}
                src="/marvel-logo.svg"
                alt="Marvel Character Finder"
              />
            </a>
          </NextLink>
        </div>

        <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
          {user && (
            <Menu.Item key="logout">
              <a href="/api/logout">Logout</a>
            </Menu.Item>
          )}

          {!user && (
            <Menu.Item key="logout">
              <NextLink href="/login">
                <a>Login</a>
              </NextLink>
            </Menu.Item>
          )}
        </Menu>
      </Header>

      <Content style={{ margin: '0 50px' }}>{children}</Content>

      <Footer style={{ textAlign: 'center' }}>
        <Text>
          Built by
          {' '}
          <Link href="https://github.com/fnandogp" target="_blank">
            Fernando Pinheiro
          </Link>
          .
        </Text>
        <br />
        <Text>Data provided by</Text>
        {' '}
        <Link href="https://developer.marvel.com" target="_blank">
          Marvel
        </Link>
        . 
        {' '}
        <Text>© 2020 MARVEL</Text>
      </Footer>
    </AntdLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]).isRequired,
};

export default Layout;
