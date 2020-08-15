import useSWR from 'swr';
import axios from 'axios';
import { Row, Col, Card, Skeleton } from 'antd';
import styles from './style.module.css';
import Layout from '../components/Layout/index';

const { Meta } = Card;

const fetcher = (url) =>
  axios.get(url).then((res) => res.data.response.data.results);

const Home = () => {
  const { data, error } = useSWR('/api/characters', fetcher);

  console.log('data', data);
  console.log('error', error);

  return (
    <Layout>
      <>
        {!data && (
          <Row gutter={16}>
            <Col span={6}>
              <Skeleton active avatar paragraph={{ rows: 4 }} />
            </Col>
          </Row>
        )}

        {data && (
          <Row gutter={16}>
            {data.map((char) => {
              return (
                <Col key={char.id} span={4} xs={24} sm={12} md={8} lg={6} xl={4}>
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
        )}
      </>
    </Layout>
  );
};

export default Home;
