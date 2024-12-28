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
        className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-5 py-3 border-b border-gray-300">
        <div className="text-xl font-bold text-black">Learning</div>
        <div className="flex items-center gap-4">
        <Button >מילון</Button>
        <Button >בית</Button>
          <DownOutlined className="w-4 h-4 text-black" />
          <p className="w-4 h-4 text-black"> גיל</p>
          <Badge
            count={
              <img
                src="https://www.svgrepo.com/show/131993/germany.svg"
                alt="German Flag"
                style={{ width: 30, height: 18, borderRadius: 2, marginRight: 1, marginTop: 2 }}
              />
            }
          >
            <Avatar icon={<UserOutlined />} />
          </Badge>
        </div>
      </Header>
      <div className="pt-16">
        {myComponent}
      </div>
    </Layout>
  );
};

export default MainLayout;