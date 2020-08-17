import { Layout as AntdLayout, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from './style.module.css';

const { Header, Footer, Content } = AntdLayout;
const { Text, Link } = Typography;

function Layout({ children }) {
  const router = useRouter();

  return (
    <AntdLayout>
      <Head>
        <title> Character Finder - Marvel </title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Header className={styles.header}>
        <Link href="/" onClick={() => router.push('/')}>
          <img
            className={styles.logo}
            src="/marvel-logo.svg"
            alt="Marvel Character Finder"
          />
        </Link>
      </Header>

      <Content>
        <div className={styles.content}>{children}</div>
      </Content>

      <Footer className={styles.footer}>
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
