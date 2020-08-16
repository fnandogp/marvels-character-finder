import { useState, useEffect } from 'react';
import { useDebounce } from 'ahooks';
import {
  PageHeader,
  Card,
  Col,
  Input,
  Row,
  Space,
  Skeleton,
  Pagination,
  Typography,
  Divider,
} from 'antd';
import axios from 'axios';
import useSWR from 'swr';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import styles from './style.module.css';
import CharacterAvatar from '../components/CharacterAvatar';

const { Meta } = Card;
const { Link } = Typography;

const fetcher = (url, query, page, pageSize) => {
  const params = { query, page, pageSize };

  return axios.get(url, { params }).then((res) => res.data.response);
};

const Characters = () => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.query || '');
  const [page, setPage] = useState(router.query.page || 1);
  const [pageSize, setPageSize] = useState(router.query.pageSize || 20);
  const debouncedQuery = useDebounce(query);

  const { data } = useSWR(
    ['/api/characters', debouncedQuery, page, pageSize],
    fetcher
  );

  useEffect(() => {
    router.push({ query: { query: debouncedQuery, page, pageSize } });
  }, [debouncedQuery, page, pageSize]);

  const handlePaginationChange = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  const characters = data?.results || [];

  return (
    <Layout>
      <PageHeader title="Characters Finder" />

      <Card>
        <Space direction="vertical" size="large">
          <Input.Search
            placeholder="who are you looking for?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          {characters.length === 0 && (
            <Row gutter={[16, 16]}>
              {[...Array(24).keys()].map((i) => (
                <Col key={i} xs={24} sm={12} md={8} lg={6} xl={4}>
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </Col>
              ))}
            </Row>
          )}

          {characters.length > 0 && (
            <>
              <Row gutter={[16, 16]}>
                {characters.map((character) => {
                  return (
                    <Col
                      key={character.id}
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      xl={4}
                    >
                      <NextLink href="/[id]" as={`/${character.id}`} passHref>
                        <a>
                          <Card
                            className={styles.card}
                            hoverable
                            cover={(
                              <CharacterAvatar
                                url={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                size={300}
                              />
                            )}
                          >
                            <Meta title={character.name} />
                          </Card>
                        </a>
                      </NextLink>
                    </Col>
                  );
                })}
              </Row>

              <Divider />

              <Pagination
                defaultCurrent={page}
                pageSize={pageSize}
                showQuickJumper
                total={data.total}
                onChange={handlePaginationChange}
                style={{ textAlign: 'center' }}
              />
            </>
          )}
        </Space>
      </Card>
    </Layout>
  );
};

Characters.propTypes = {};

export default Characters;
