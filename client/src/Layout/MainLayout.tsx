import React from 'react';
import { Button, Layout, Badge, Avatar } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import "../index.css";

const { Header } = Layout;


interface MainLayoutProps {
  myComponent: React.ReactNode;
  levelName: string;
  courseName: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ myComponent, levelName, courseName }) => {
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          color: 'white',
          padding: '0 20px',
          borderBottom: '1px solid hsl(220, 13%, 91%)',
        }}
      >
        <div style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>Learning</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Button style={{ margin: '0 10px' }}>מילון</Button>
        <Button style={{ margin: '0 10px' }}>בית</Button>


          <DownOutlined style={{ fontSize: '15px', color: 'black' }} />
          <p style={{ margin: 0, fontSize: '16px', color: 'black' }}> גיל</p>
          <Badge
            count={
              <img
                src="https://www.svgrepo.com/show/131993/germany.svg"
                alt="German Flag"
                style={{
                  width: 30,
                  height: 18,
                  borderRadius: 2,
                  marginRight: 1,
                  marginTop: 2,
                }}
              />
            }
          >
            <Avatar icon={<UserOutlined />} />
          </Badge>
        </div>
      </Header>
      <div style={{ paddingTop: '64px' }}>
        {/* Content starts below the navbar */}
        {myComponent}
      </div>
    </Layout>
  );
};

export default MainLayout;