import React from 'react';
import { Spin, Card, Button, Tag, List, Table } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECT, GET_PROJECTS } from '../query/projectQuery';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import Loader from './Loader';
import { DELETE_PROJECT } from '../mutations/projectMutaions';

const Project = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: id },
    refetchQueries: [{ query: GET_PROJECTS }],
    // update(cache, { data: { deleteProject } }) {
    //   const { projects } = cache.readQuery({ query: GET_PROJECTS });

    //   cache.writeQuery({
    //     key: GET_PROJECTS,
    //     data: {
    //       projects: projects.filter((item) => item.id !== deleteProject.id),
    //     },
    //   });
    // },
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
    navigate('/');
  };

  return (
    <Card style={{ margin: '2rem' }}>
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
          rowKey={'id'}
          pagination={false}
          dataSource={[data.project.client]}
          columns={columns}
        />
      </div>
    </Card>
  );
};

export default Project;
