import { useQuery } from '@apollo/client';
import { Button, Card, Col, Grid, Row, Tag, Modal, Divider } from 'antd';
import { GET_PROJECTS } from '../query/projectQuery';
import { useNavigate } from 'react-router-dom';
import Loader from '../pages/Loader';
import { FileAddOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AddProjectForm from './AddProjectForm';

const { useBreakpoint } = Grid;

const Projects = () => {
  let navigate = useNavigate();
  const [addProjectModal, setAddProjectModal] = useState(false);
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const screens = useBreakpoint();

  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;

  return (
    <Card style={{ marginBottom: '10px' }}>
      <Button
        type='primary'
        onClick={() => setAddProjectModal(!addProjectModal)}
        style={{ marginBottom: '10px' }}
      >
        <FileAddOutlined /> Add Project
      </Button>

      <Row gutter={{ lg: 10, sm: 10, xs: 10 }}>
        {data.projects.map((project) => (
          <Col span={screens['xs'] ? 24 : 12} gutter={[16, 24]}>
            <Card
              style={{
                marginBottom: '2rem',
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

      <Modal
        open={addProjectModal}
        title='Add Project'
        footer={false}
        onCancel={() => setAddProjectModal(false)}
      >
        <Divider />
        <AddProjectForm closeModal={() => setAddProjectModal(false)} />
      </Modal>
    </Card>
  );
};

export default Projects;
