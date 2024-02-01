import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../query/projectQuery';
import {
  Button,
  Card,
  Col,
  Row,
  Grid,
  Tag,
  Modal,
  Spin,
  Table,
  Typography,
} from 'antd';

const { useBreakpoint } = Grid;
const { Title } = Typography;

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const screens = useBreakpoint();
  console.log(screens);

  if (loading) return <Spin />;
  if (error) return <p>Something went wrong</p>;
  console.log(data);

  return (
    <Row>
      {data.projects.map((project) => (
        <Col span={screens['xs'] ? 24 : 12} gutter={[16, 24]}>
          <Card
            style={{
              margin: '2rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}
            >
              <div>
                <h4 style={{ padding: '.1rem', textTransform: 'uppercase' }}>
                  {project.name}
                </h4>
                <Tag>{project.status}</Tag>
              </div>
              <Button>View</Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Projects;
