import React, { useState } from "react";
import { Button, Layout, Badge, Avatar, Image, Modal, Skeleton, Grid } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Flags from "./common/Flags";
import { CourseLangauge } from "../../api/common/types";
import { useQuery } from "@tanstack/react-query";
import { USER_FLAG, USER_POINTS } from "./requests/queryKeys";
import { fetchAllPoints, fetchUserFlag } from "../../api/layout";
import { useWithAuth } from "../../api/common/withAuth";
import { useUser } from "@clerk/clerk-react";
import classNames from "classnames";

const { Header } = Layout;

interface MainLayoutProps {
  myComponent: React.ReactNode;
  levelName: string;
  courseName: string;
  pointsRef?: any;
  languageRef?: any;
  contactRef?: any;
  dictionaryRef?: any;
  homeRef?: any;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  myComponent,
  levelName,
  courseName,
  pointsRef,
  languageRef,
  contactRef,
  dictionaryRef,
  homeRef,
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const { user } = useUser();
  const withAuth = useWithAuth();
  const allPoints = () => withAuth((token) => fetchAllPoints(token));
  const userFlag = () => withAuth((token) => fetchUserFlag(token));

  const { data: flag, isLoading: userFlagLoading } = useQuery([USER_FLAG], userFlag);
  const { data: userPoints, isLoading: pointsLoading } = useQuery([USER_POINTS], allPoints);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getToken, isLoaded, signOut } = useAuth();

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const flagUrl = (flag: CourseLangauge | undefined): string | undefined => {
    if (flag === CourseLangauge.English) return "https://www.svgrepo.com/show/242307/united-states-of-america-united-states.svg";
    if (flag === CourseLangauge.French) return "https://www.svgrepo.com/show/401605/flag-for-france.svg";
    if (flag === CourseLangauge.German) return "https://www.svgrepo.com/show/131993/germany.svg";
    if (flag === CourseLangauge.Italian) return "https://www.svgrepo.com/show/401660/flag-for-italy.svg";
    if (flag === CourseLangauge.Spanish) return "https://www.svgrepo.com/show/401755/flag-for-spain.svg";
  };

  const isLoading = userFlagLoading || pointsLoading;

  return (
    <Layout>
      <div className="w-full overflow-hidden">
        <Header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-md z-50 flex justify-between items-center px-6 py-4 border-b border-gray-200">
          {/* right Section */}
          <div className="flex items-center gap-6">
            <Button
              type="primary"
              danger
              onClick={() => signOut()}
              disabled={!isLoaded}
              className={classNames(
                "border border-transparent !bg-transparent !text-red-500 hover:!border-red-500 hover:!text-red-600 hover:!shadow-sm !transition-all flex items-center transform hover:scale-105 transition-transform duration-300",
                {
                  "px-4 py-1 text-sm gap-2": !isMobile,
                  "px-2 py-0.5 text-xs gap-1": isMobile,
                }
              )}
            >
              התנתק <i className="fas fa-sign-out-alt"></i>
            </Button>

            <div
              className={classNames(
                "flex items-center text-red-500",
                isMobile ? "absolute top-1/2 !right-20 -translate-y-1/2 flex-row items-center text-sm gap-2" : "text-lg gap-1"
              )}
            >
              {isLoading ? (
                <Skeleton.Button active size="small" />
              ) : (
                <span className={classNames("flex items-center gap-1", { "text-base": !isMobile, "text-sm": isMobile })}>
                  {userPoints?.points}
                  <i className="fas fa-star"></i>
                </span>
              )}
            </div>

            <div
              ref={languageRef}
              className={classNames(
                "flex items-center",
                isMobile ? "absolute top-1/2 -right-4 -translate-y-1/2 flex-row gap-1 items-center pr-2 text-xs" : "justify-center gap-2"
              )}
            >

          {isLoading ? (
            <Skeleton.Button active size="small" className="mt-3" />
          ) : (
            <span className={classNames("text-gray-500", { 
              "text-lg hidden lg:block": !isMobile,
              "text-sm": isMobile
            })}>
              {isMobile ? user?.firstName : `${user?.firstName} ${user?.lastName}`}
            </span>
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
                  className={classNames("rounded-sm", { "mr-5 mt-0.5": !isMobile, "mr-5": isMobile })}
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
  
          {/* Center Section */}
          <div
            className={classNames(
              "absolute top-0 left-0 w-full h-full flex items-center pointer-events-none justify-center",
              isMobile ? "gap-1" : "gap-4"
            )}
          >
            <Link to="/contact">
              <Button
                ref={contactRef}
                className="border border-transparent !bg-transparent !text-gray-700 hover:!border-gray-300 hover:!text-gray-800 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300 pointer-events-auto"
              >
                {!isMobile && "צור קשר"}  
                <i className="fas fa-envelope"></i>
              </Button>
            </Link>
            <Link to="/dictionary">
              <Button
                ref={dictionaryRef}
                className="border border-transparent !bg-transparent !text-gray-700 hover:!border-gray-300 hover:!text-gray-800 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300 pointer-events-auto"
              >
                {!isMobile && "מילון"}  
                <i className="fas fa-book"></i>
              </Button>
            </Link>
            <Link to="/main">
              <Button
                ref={homeRef}
                className="border border-transparent !bg-transparent !text-gray-700 hover:!border-gray-300 hover:!text-gray-800 hover:!shadow-sm !px-4 !py-2 !transition-all text-sm flex items-center gap-2 transform hover:scale-105 transition-transform duration-300 pointer-events-auto"
              >
                {!isMobile && "בית"}  
                <i className="fas fa-home"></i>
              </Button>
            </Link>
          </div>
  
          {isMobile ? null : (
            <div className="flex items-center gap-4">
              <div className="block text-gray-500 text-sm">
                לומדים שפות בקלות
              </div>
              <div className="bg-gray-400 w-px h-8"></div>
  
              <div className="text-4xl font-extrabold tracking-wide relative inline-block">
                <span className="bg-gradient-to-r from-[hsl(142.1,76.2%,36.3%)] to-[hsl(142.1,70.6%,45.3%)] bg-clip-text text-transparent transition-colors">
                  Starts
                </span>
                <span className="text-black">Tok</span>
              </div>
            </div>
          )}
        </Header>
      </div>
  
      <div className="pt-20 bg-white w-full overflow-hidden">
        {myComponent}
      </div>
    </Layout>
  );    
};

export default MainLayout;