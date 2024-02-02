import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Table, Tag } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE_PROJECT } from '../mutations/projectMutaions';
import { GET_PROJECT, GET_PROJECTS } from '../query/projectQuery';
import Loader from './Loader';

const ProjectDetails = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: id },
    onCompleted: () => navigate('/projects'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  const deleteProjectCall = async () => {
    await deleteProject();
  };

  return (
    <Card>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => navigate('/')}>
            <ArrowLeftOutlined />
          </Button>
          <Button
            style={{ color: 'white', backgroundColor: 'red' }}
            onClick={deleteProjectCall}
          >
            <DeleteOutlined />
          </Button>
        </div>

        <h2 style={{ marginTop: '2rem', textTransform: 'capitalize' }}>
          {data.project.name}
        </h2>
        <p style={{ color: 'gray' }}>{data.project.description}</p>
        <Tag style={{ marginTop: '2rem' }}>Status: {data.project.status}</Tag>
        <h2 style={{ marginTop: '2rem' }}>Personal Info</h2>
        <Table
          scroll={{
            x: 700,
          }}
          rowKey={'id'}
          pagination={false}
          dataSource={[data.project.client]}
          columns={columns}
        />
      </div>
    </Card>
  );
};

export default ProjectDetails;
