import { Layout as AntdLayout } from 'antd';
import PropTypes from 'prop-types';
import styles from '../styles/Layout.module.css';

const { Header, Footer, Content } = AntdLayout;

function Layout({ children }) {
  return (
    <AntdLayout>
      <Header className={styles.header}>
        <img
          className={styles.logo}
          src="/marvel-logo.svg"
          alt="Marvel Character Finder"
        />
      </Header>

      <Content>
        <div className={styles.content}>{children}</div>
      </Content>

      <Footer className={styles.footer}>
        Built by Fernando Pinheiro.
        <br />
        Proudly using
        {' '}
        <a href="https://developer.marvel.com">Marvel Public API</a>
        .
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
