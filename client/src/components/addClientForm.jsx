import { useMutation } from '@apollo/client';
import { Button, Form, Input, notification } from 'antd';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { useState } from 'react';
import { GET_CLIENTS } from '../query/clientQuery';

const AddClientForm = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      console.log(addClient);

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  const [form] = Form.useForm();
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

  const onSubmit = async (props) => {
    if (!name || !email || !phone) {
      return notification.error({
        message: 'Please fill in the all the required fields',
      });
    }
    await addClient();
    notification.success({
      message: 'Client added successfully',
    });
    form.resetFields();
    closeModal();
  };

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
        label='Email'
        name='Email'
        onChange={(e) => setEmail(e.target.value)}
        rules={[{ required: true, message: 'Please input Email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Phone'
        name='Phone'
        onChange={(e) => setPhone(e.target.value)}
        rules={[{ required: true, message: 'Please input Phone!' }]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        label='Discription'
        name='Discription'
        rules={[{ required: true, message: 'Please input Discription!' }]}
      >
        <Input.TextArea />
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddClientForm;
