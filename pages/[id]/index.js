// import styles from './style.module.css';
import { Card, Col, List, PageHeader, Row, Spin, Typography } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../../components/Layout';
import CharacterAvatar from '../../components/CharacterAvatar';

const { Paragraph, Text, Title } = Typography;

const fetcher = (url) => {
  return axios.get(url).then((res) => res.data.response.results[0]);
};

const CharacterViewLoading = () => (
  <Layout>
    <Card style={{ margin: '1rem 0', textAlign: 'center' }}>
      <Spin />
    </Card>
  </Layout>
);

const CharacterView = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <CharacterViewLoading />;

  const { data: character } = useSWR(`/api/characters/${id}`, fetcher);

  if (!character) return <CharacterViewLoading />;

  const { series, comics, stories, events } = character;
  const collections = [
    { name: 'Series', items: series.items },
    { name: 'Comics', items: comics.items },
    { name: 'Stories', items: stories.items },
    { name: 'Events', items: events.items },
  ];

  return (
    <Layout>
      <PageHeader title={character.name} onBack={() => window.history.back()} />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6} style={{ textAlign: 'center' }}>
          <CharacterAvatar
            url={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            size={300}
          />
        </Col>

        <Col xs={24} lg={18}>
          <Card style={{ marginBottom: '1rem' }}>
            <Paragraph>
              {character.description || '- description not provided -'}
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {collections.map((collection) => (
          <Col key={collection.name} xs={24} lg={6}>
            <Card>
              <Title level={4}>{collection.name}</Title>

              {!collection.items.lenght && <Text>- none -</Text>}

              <List>
                {collection.items.map((item) => {
                  return <List.Item>{item.name}</List.Item>;
                })}
              </List>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default CharacterView;
