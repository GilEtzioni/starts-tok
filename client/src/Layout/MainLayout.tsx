import React, { useEffect } from 'react';
import { Button, Layout, Badge, Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import "../index.css";
import { SignedIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";

const { Header } = Layout;

interface MainLayoutProps {
  myComponent: React.ReactNode;
  levelName: string;
  courseName: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ myComponent, levelName, courseName }) => {
  const { signOut } = useAuth();
  const { getToken } = useAuth();


  const handleSignOut = () => {
    signOut();
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        console.log("Token: ", token);
      } catch (error) {
        error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, [getToken]);

  return (
    <Layout>
      <Header
        className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-5 py-3 border-b border-gray-300">
        <div className="text-xl font-bold text-black">Learning</div>
        <div className="flex items-center gap-4">
          <Link to="/dictionary">
            <Button>מילון</Button>
          </Link>

          <Link to="/main">
            <Button>בית</Button>
          </Link>

          <SignedIn>
            <Button type="primary" danger onClick={handleSignOut}>
              Log Out
            </Button>
          </SignedIn>

          <Badge
            count={
              <Image
                src="https://www.svgrepo.com/show/131993/germany.svg"
                alt="German Flag"
                width={20}
                height={18}
                preview={false}
                style={{ borderRadius: 2, marginRight: 20, marginTop: 2 }}
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
