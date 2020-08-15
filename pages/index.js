import { useDebounce } from 'ahooks';
import { Card, Col, Input, Row, Space, Skeleton } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useSWR from 'swr';
import Layout from '../components/Layout';
import styles from './style.module.css';

const { Meta } = Card;

const fetcher = (url, query = null) => {
  const params = {};
  if (query) {
    params.nameStartsWith = query;
  }

  return axios
    .get(url, { params })
    .then((res) => res.data.response.data.results);
};

// export async function getServerSideProps() {
// const chars = await fetcher('/api/characters');
// return { props: { chars } };
// }

const Home = ({ chars: initialData }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const { data: chars } = useSWR(['/api/characters', debouncedQuery], fetcher, {
    initialData,
  });

  if (!chars) {
    return (
      <Row gutter={16}>
        <Col span={6}>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Col>
        <Col span={6}>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Col>
        <Col span={6}>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Col>
        <Col span={6}>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Col>
      </Row>
    );
  }

  return (
    <Layout>
      <Space direction="vertical" size="large">
        <Input
          placeholder="who are you looking for?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <Row gutter={16}>
          {chars.map((char) => {
            return (
              <Col key={char.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                  hoverable
                  className={styles.card}
                  cover={(
                    <div className={styles.cardCover}>
                      <div
                        className={styles.cardCoverImage}
                        style={{
                          backgroundImage: `url('${char.thumbnail.path}.${char.thumbnail.extension}')`,
                          // backgroundImage: "url('/marvel-logo.svg')"
                        }}
                      />
                    </div>
                  )}
                >
                  <Meta title={char.name} />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Space>
    </Layout>
  );
};

Home.propTypes = {
  chars: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      thumbnail: PropTypes.shape({
        path: PropTypes.string.isRequired,
        extension: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
};

export default Home;
