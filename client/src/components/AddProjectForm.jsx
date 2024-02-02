import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, notification, Select } from 'antd';
import { ADD_PROJECT } from '../mutations/projectMutaions';
import { useState } from 'react';
import { GET_CLIENTS } from '../query/clientQuery';
import Loader from '../Pages/Loader';
import { GET_PROJECT, GET_PROJECTS } from '../query/projectQuery';

const AddProjectForm = ({ closeModal }) => {
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [clientId, setClientId] = useState('');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const { loading, error, data: clientData } = useQuery(GET_CLIENTS);

  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const onSubmit = async () => {
    if (!name || !description || !status || !clientId) {
      return notification.error({
        message: 'Please fill in the all the required fields',
      });
    }
    await addProject();
    notification.success({
      message: 'Project added successfully',
    });
    form.resetFields();
    closeModal();
  };

  const clientOptions = clientData.clients.map((client) => ({
    value: client.id,
    label: client.name,
  }));

  const statusOptions = [
    {
      value: 'new',
      label: 'NOT STARTED',
    },
    {
      value: 'inProgress',
      label: 'IN PROGRESS',
    },
    {
      value: 'completed',
      label: 'COMPLETED',
    },
  ];

  return (
    <Form
      form={form}
      {...formItemLayout}
      onSubmitCapture={onSubmit}
      variant='filled'
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label='Name'
        name='Name'
        onChange={(e) => setName(e.target.value)}
        rules={[{ required: true, message: 'Please input Name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Status'
        name='Status'
        rules={[{ required: true, message: 'Please Select Status!' }]}
      >
        <Select
          onChange={(value) => setStatus(value)}
          options={statusOptions}
        />
      </Form.Item>

      <Form.Item
        label='Client'
        name='Client'
        rules={[{ required: true, message: 'Please Select Client!' }]}
      >
        <Select
          onChange={(value) => setClientId(value)}
          options={clientOptions}
        />
      </Form.Item>

      <Form.Item
        label='Discription'
        name='Discription'
        onChange={(e) => setDescription(e.target.value)}
        rules={[{ required: true, message: 'Please input Discription!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProjectForm;
