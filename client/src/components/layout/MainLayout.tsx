import React, { useEffect, useState } from 'react';
import { Button, Layout, Badge, Avatar, Image, Modal, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { SignedIn, useAuth } from "@clerk/clerk-react";
import Flags from './common/Flags';
import { CourseLangauge } from '../../api/common/types';
import { useQuery } from '@tanstack/react-query';
import { USER_FLAG, USER_POINTS } from './requests/queryKeys';
import { fetchAllPoints, fetchUserFlag } from '../../api/layout';
import { useWithAuth } from '../../api/common/withAuth';

const { Header } = Layout;
interface MainLayoutProps {
  myComponent: React.ReactNode;
  levelName: string;
  courseName: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ myComponent, levelName, courseName }) => {

  const withAuth = useWithAuth();
  const allPoints = () => withAuth((token) => fetchAllPoints(token));
  const userFlag = () => withAuth((token) => fetchUserFlag(token));

  const { data: flag, isLoading: userFlagLoading, isError: userFlagError } = useQuery(
    [USER_FLAG],
    userFlag)

  const { data: user, isLoading: pointsLoading, isError: pointsError } = useQuery(
    [USER_POINTS],
    allPoints)

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { getToken, isLoaded, signOut } = useAuth();

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

  const flagUrl = (flag: CourseLangauge | undefined): string | undefined => {
    if (flag === CourseLangauge.English) return "https://www.svgrepo.com/show/242307/united-states-of-america-united-states.svg";
    if (flag === CourseLangauge.French) return "https://www.svgrepo.com/show/401605/flag-for-france.svg";
    if (flag === CourseLangauge.German) return "https://www.svgrepo.com/show/131993/germany.svg";
    if (flag === CourseLangauge.Italian) return "https://www.svgrepo.com/show/401660/flag-for-italy.svg";
    if (flag === CourseLangauge.Spanish) return "https://www.svgrepo.com/show/401755/flag-for-spain.svg";
    return undefined;
  };
    
    const isLoading = userFlagLoading || pointsLoading;

    return (
      <Layout>
        <Header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-md z-50 flex justify-between items-center px-6 py-4 border-b border-gray-200">
          {/* right Section */}
          <div className="flex items-center gap-6">
          <Button
            type="primary"
            danger
            onClick={() => signOut()}
            disabled={!isLoaded}
            className="border border-transparent !bg-transparent !text-red-500 hover:!border-red-500 hover:!text-red-600 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300"
          >
            התנתק <i className="fas fa-sign-out-alt"></i>
          </Button>

          <div className="flex items-center text-red-500 text-lg gap-2">
            {isLoading ? (
              <Skeleton.Button active size="small" />
            ) : (
              <span>{user?.points}</span>
            )}
            <i className="fas fa-star"></i>
          </div>

          <div className="flex items-center justify-center gap-2 h-full">
            {isLoading ? (
              <Skeleton.Button active size="small" className="mt-3" />
            ) : (
              <span className="hidden lg:block text-gray-500 text-lg">{user?.userName}</span>
            )}
            {!isLoading && (
              <Badge
                onClick={showModal}
                count={
                  <Image
                    src={flagUrl(Array.isArray(flag) ? flag[0] : flag ?? undefined)}
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
            )}
          </div>

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
        </div>

        {/* center Section */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-4 pointer-events-none">
          <Link to="/contact">
            <Button
              className="border border-transparent !bg-transparent !text-gray-700 hover:!border-gray-300 hover:!text-gray-800 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300 pointer-events-auto"
            >
              צור קשר<i className="fas fa-envelope"></i>
            </Button>
          </Link>
          <Link to="/dictionary">
            <Button
              className="border border-transparent !bg-transparent !text-gray-700 hover:!border-gray-300 hover:!text-gray-800 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300 pointer-events-auto"
            >
              מילון <i className="fas fa-book"></i>
            </Button>
          </Link>
          <Link to="/main">
            <Button
              className="border border-transparent !bg-transparent !text-gray-700 hover:!border-gray-300 hover:!text-gray-800 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300 pointer-events-auto"
            >
              בית <i className="fas fa-home"></i>
            </Button>
          </Link>
        </div>

        {/* left section */}
        <div className="flex items-center gap-4">
        <div className="hidden lg:block text-gray-500 text-sm">
          לומדים שפות בקלות
        </div>
        <div className="bg-gray-400 w-px h-8"></div>
        <div className="text-4xl font-extrabold tracking-wide relative inline-block">
          <span className="bg-gradient-to-r from-[hsl(142.1,76.2%,36.3%)] to-[hsl(142.1,70.6%,45.3%)] bg-clip-text text-transparent transition-colors">
            Start
          </span>
          <span className="text-black">Tok</span>
        </div>
      </div>
      </Header>
      <div className="pt-20 bg-white">
        {myComponent}
      </div>
    </Layout>
  );
};

export default MainLayout;