import { Form, Input, InputNumber, Button } from 'antd';
const AddClientForm = () => {
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

  return (
    <Form {...formItemLayout} variant='filled' style={{ maxWidth: 600 }}>
      <Form.Item
        label='Name'
        name='Name'
        rules={[{ required: true, message: 'Please input Name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Email'
        name='Email'
        rules={[{ required: true, message: 'Please input Email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Discription'
        name='Discription'
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

export default AddClientForm;
