import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Modal, Table, Divider, notification, Spin } from 'antd';
import { useState } from 'react';
import Loader from '../pages/Loader';
import { DELETE_CLIENTS } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../query/clientQuery';
import AddClientForm from './AddClientForm';
import { GET_PROJECTS } from '../query/projectQuery';

const DeleteItem = ({ client, refetch }) => {
  const [deleteClient, { loading }] = useMutation(DELETE_CLIENTS, {
    variables: { id: client.id },
    onCompleted: () => {
      notification.success({ message: 'Client deleted successfully' });
      refetch();
    },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <Button onClick={deleteClient} style={{ backgroundColor: 'red' }}>
      {loading ? <Spin /> : <DeleteOutlined style={{ color: 'white' }} />}
    </Button>
  );
};

const Clients = () => {
  const [addClientModal, setAddClientModal] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_CLIENTS);

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
      key: 'button',
      render: (item) => <DeleteItem client={item} refetch={refetch} />,
    },
  ];

  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;

  return (
    <Card>
      <Button
        type='primary'
        onClick={() => setAddClientModal(!addClientModal)}
        style={{ marginBottom: '10px' }}
      >
        {' '}
        <FileAddOutlined /> Add Client
      </Button>

      <Table rowKey={'id'} dataSource={data.clients} columns={columns} />

      <Modal
        open={addClientModal}
        title='Add Client'
        footer={false}
        onCancel={() => setAddClientModal(false)}
      >
        <Divider />
        <AddClientForm closeModal={() => setAddClientModal(false)} />
      </Modal>
    </Card>
  );
};

export default Clients;
