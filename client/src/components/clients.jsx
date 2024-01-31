import { useQuery } from '@apollo/client';
import { Table, Card, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { GET_CLIENTS } from '../query/clientQuery';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENTS } from '../mutations/clientMutations';

const DeleteItem = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENTS, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return <DeleteOutlined onClick={deleteClient} style={{ color: 'red' }} />;
};

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
      render: (item) => <DeleteItem client={item} />,
    },
  ];

  if (loading) return <Spin />;
  if (error) return <p>Something went wrong</p>;

  return (
    <Card>
      <Table dataSource={data.clients} columns={columns} />
    </Card>
  );
};

export default Clients;
