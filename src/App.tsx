import React from 'react';
import { Layout } from 'antd';
import UserTable from './components/UserTable';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <UserTable />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>My App ©2024</Footer>
    </Layout>
  );
};

export default App;
