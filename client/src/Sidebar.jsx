import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  FundProjectionScreenOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import Graphql from './assets/graphql.png';
const { Header, Sider, Content } = Layout;

const Container = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menu = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Home',
      onClick: () => {
        navigate('/');
      },
    },
    {
      key: '2',
      icon: <ProjectOutlined />,
      label: 'Projects',
      onClick: () => {
        navigate('/projects');
      },
    },
    {
      key: '3',
      icon: <FundProjectionScreenOutlined />,
      label: 'Clients',
      onClick: () => {
        navigate('/clients');
      },
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical'>
          <img src={Graphql} alt='graphql' />
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={menu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Container;
