import { useQuery } from '@apollo/client';
import { Button, Card, Col, Grid, Row, Spin, Tag } from 'antd';
import { GET_PROJECTS } from '../query/projectQuery';
import { useNavigate } from 'react-router-dom';
import Loader from '../Pages/Loader';

const { useBreakpoint } = Grid;

const Projects = () => {
  let navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const screens = useBreakpoint();

  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;

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
                <h4 style={{ padding: '.1rem', textTransform: 'capitalize' }}>
                  {project.name}
                </h4>
                <Tag>{project.status}</Tag>
              </div>
              <Button onClick={() => navigate(`/project/${project.id}`)}>
                View
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Projects;
