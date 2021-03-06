// import styles from './style.module.css';
import {
  Card,
  Col,
  List,
  PageHeader,
  Row,
  Spin,
  Typography,
  Divider,
} from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../../components/layout';
import CharacterAvatar from '../../components/character-avatar';
import useUser from '../../hooks/useUser';

const { Paragraph, Text, Title } = Typography;

const fetcher = (url) => {
  return axios.get(url).then((res) => res.data.results[0]);
};

const CharacterViewLoading = () => (
  <Layout>
    <Card style={{ margin: '1rem 0', textAlign: 'center' }}>
      <Spin />
    </Card>
  </Layout>
);

const CharacterView = () => {
  const user = useUser({ redirectTo: '/login' });
  const router = useRouter();
  const { id } = router.query;

  const { data: character } = useSWR(
    user && id ? `/api/characters/${id}` : null,
    fetcher
  );

  if (!id) return <CharacterViewLoading />;

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
              <Title level={4}>
                {`${collection.name} (${collection.items.length})`}
              </Title>

              <Divider />

              {collection.items.length === 0 && <Text>- none -</Text>}

              <List>
                {collection.items.map((item) => {
                  return <List.Item key={item.name}>{item.name}</List.Item>;
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
