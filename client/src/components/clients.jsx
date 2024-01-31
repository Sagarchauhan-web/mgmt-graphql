import { gql, useQuery } from '@apollo/client';
import { Table, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

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
    {
      title: 'Delete',
      key: 'phone',
      render: () => {
        return <DeleteOutlined style={{ color: 'red' }} />;
      },
    },
  ];

  if (loading) return <p>Loading</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <Card>
      <Table dataSource={data.clients} columns={columns} />
    </Card>
  );
};

export default Clients;
