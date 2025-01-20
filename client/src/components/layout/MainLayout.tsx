import React, { useEffect, useState } from 'react';
import { Button, Layout, Badge, Avatar, Image, Modal, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useFetchPointsData, useFetchUserFlag } from "../../api/layout/hooks";
import Flags from './components/Flags';
import { CourseLangauge } from '../../api/common/types';

const { Header } = Layout;
interface MainLayoutProps {
  myComponent: React.ReactNode;
  levelName: string;
  courseName: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ myComponent, levelName, courseName }) => {
  const { data: userFlag, isLoading: userFlagLoading, isError: userFlagError } = useFetchUserFlag();
  const { data: points, isLoading: pointsLoading, isError: pointsError } = useFetchPointsData();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { signOut } = useAuth();
  const { getToken } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log("Token: ", token);
    };

    fetchToken();
  }, [getToken]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const flagUrl = 
  Array.isArray(userFlag) || userFlag === undefined
    ? "https://www.svgrepo.com/show/242307/united-states-of-america-united-states.svg" // fallback to USA flag
    : userFlag === CourseLangauge.French
    ? "https://www.svgrepo.com/show/401605/flag-for-france.svg"
    : userFlag === CourseLangauge.German
    ? "https://www.svgrepo.com/show/131993/germany.svg"
    : userFlag === CourseLangauge.Italian
    ? "https://www.svgrepo.com/show/401660/flag-for-italy.svg"
    : userFlag === CourseLangauge.Spanish
    ? "https://www.svgrepo.com/show/401755/flag-for-spain.svg"
    : "https://www.svgrepo.com/show/242307/united-states-of-america-united-states.svg";

  if (userFlagLoading || pointsLoading) {
    return (
      <Layout>
        <Header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-md z-50 flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <Spin size="large" />
        </Header>
        <div className="pt-20 bg-white">
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-md z-50 flex justify-between items-center px-6 py-4 border-b border-gray-200">
        {/* Left Section: Logo and Tagline */}
        <div className="flex items-center gap-4">
          <div className="text-4xl font-extrabold tracking-wide relative inline-block">
            <span className="bg-gradient-to-r from-[hsl(142.1,76.2%,36.3%)] to-[hsl(142.1,70.6%,45.3%)] bg-clip-text text-transparent transition-colors">
              Start
            </span>
            <span className="text-black">Tok</span>
          </div>
          <div className="bg-gray-400 w-px h-8"></div>
          <div className="hidden lg:block text-gray-500 text-sm">
            לומדים שפות בקלות
          </div>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex items-center gap-6">
        <Link to="/contact">
            <Button
              className="border border-transparent !bg-transparent !text-gray-700 hover:!border-gray-300 hover:!text-gray-800 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300"
            >
              צור קשר<i className="fas fa-envelope"></i> 
            </Button>
          </Link>
          <Link to="/dictionary">
            <Button
              className="border border-transparent !bg-transparent !text-gray-700 hover:!border-gray-300 hover:!text-gray-800 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300"
            >
              מילון <i className="fas fa-book"></i> 
            </Button>
          </Link>
          <Link to="/main">
            <Button
              className="border border-transparent !bg-transparent !text-gray-700 hover:!border-gray-300 hover:!text-gray-800 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300"
            >
              בית <i className="fas fa-home"></i>
            </Button>
          </Link>
        </div>

        {/* Right Section: User Information */}
        <div className="flex items-center gap-6">
          <div className="flex items-center text-red-500 text-lg gap-2">
            <span> { points !== undefined ? points : 0 } </span>
            <i className="fas fa-star"></i>

          </div>
          <Badge
            onClick={showModal}
            count={
              <Image
                src={flagUrl}
                alt="Flag"
                width={20}
                height={18}
                preview={false}
                className="rounded-sm mr-5 mt-0.5"
              />
            }
          >

            <Avatar
              icon={<UserOutlined />}
              className="cursor-pointer hover:scale-105 transition-transform"
            />
          </Badge>

          <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
            closable={false}
            maskClosable={true}
            width={1000}
            height={500}
            className="custom-modal"
          >
            <Flags setIsModalVisible={setIsModalVisible} />
          </Modal>

          <SignedIn>
            <Button
              type="primary"
              danger
              onClick={handleSignOut}
              className="border border-transparent !bg-transparent !text-red-500 hover:!border-red-500 hover:!text-red-600 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300"
            >
              התנתק <i className="fas fa-sign-out-alt"></i> 
            </Button>
          </SignedIn>
        </div>
      </Header>
      <div className="pt-20 bg-white">
        {myComponent}
      </div>
    </Layout>
  );
};

export default MainLayout;