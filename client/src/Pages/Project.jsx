import React from 'react';
import { Spin, Card, Button, Tag, List, Table } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../query/projectQuery';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Loader from './Loader';

const Project = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: id },
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

  return (
    <Card style={{ margin: '2rem' }}>
      <div>
        <Button onClick={() => navigate('/')}>
          <ArrowLeftOutlined />
        </Button>
        <h2 style={{ marginTop: '2rem', textTransform: 'capitalize' }}>
          {data.project.name}
        </h2>
        <p style={{ color: 'gray' }}>{data.project.description}</p>
        <Tag style={{ marginTop: '2rem' }}>Status: {data.project.status}</Tag>
        <h2 style={{ marginTop: '2rem' }}>Personal Info</h2>
        <Table
          pagination={false}
          dataSource={[data.project.client]}
          columns={columns}
        />
      </div>
    </Card>
  );
};

export default Project;
