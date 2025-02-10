import React, { useState } from 'react';
import germanyPNG from "../../pages/MainPage/images/germanIcon.png";
import francePNG from "../../pages/MainPage/images/franceIcon.png";
import italyPNG from "../../pages/MainPage/images/italyIcon.png";
import spainPNG from "../../pages/MainPage/images/spainIcon.png";
import usaPNG from "../../pages/MainPage/images/usaIcon.png";
import { CourseLangauge } from '../../../api/common/types';
import { Image, Col, Row, Typography, Input, message, Card, Space, Grid } from 'antd';
import { useChangeLanguage } from '../requests/changeLanguageMutate'; 
import { useUser } from '@clerk/clerk-react';
import classNames from 'classnames';

interface FlagsProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Flags: React.FC<FlagsProps> = ({ setIsModalVisible }) => {

  const { Title } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const changeLanguage = useChangeLanguage();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'השם עודכן בהצלחה',
      style: { direction: 'rtl' }
    });
  };

  const handleNameChange = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await user.update({
        firstName,
        lastName
      });
      success();
    } catch (error) {
      console.error("Error updating name:", error);
    }
    setLoading(false);
  };

  const icons = [
    { src: germanyPNG, alt: "German", title: "גרמנית", language: CourseLangauge.German },
    { src: usaPNG, alt: "USA", title: "אנגלית", language: CourseLangauge.English },
    { src: francePNG, alt: "France", title: "צרפתית", language: CourseLangauge.French },
    { src: italyPNG, alt: "Italy", title: "איטלקית", language: CourseLangauge.Italian },
    { src: spainPNG, alt: "Spain", title: "ספרדית", language: CourseLangauge.Spanish },
  ];

  return (
    <div>
      {contextHolder}
      <div className="flex-grow text-center">
        <Row justify="center" className="mb-2 mt-2">
          <Title level={3} className="text-center"> החלף שפה </Title>
        </Row>
      </div>

      <Col>
        <Row 
          justify="center" 
          gutter={[isMobile ? 16 : 32, isMobile ? 16 : 32]} 
          className={classNames(isMobile ? 'gap-1' : 'gap-10')}
          >
          {icons.map((icon, index) => (
            <Col
              key={index}
              className="text-center p-4"
              style={{ position: "relative" }}
            >
              <Typography.Text className="block mb-2">{icon.title}</Typography.Text>
              <div className="relative group">
                <Image
                  onClick={() => {
                    if (icon.language) {
                      changeLanguage.mutate(icon.language);
                    }
                    setIsModalVisible(false);
                  }}
                  width={isMobile ? 40 : 100}
                  preview={false}
                  className="rounded-sm transform transition-all duration-300 group-hover:scale-110"
                  src={icon.src}
                  alt={icon.alt}
                  style={{ position: "relative", zIndex: 1 }}
                />
                <div className="absolute inset-0 transform transition-all duration-300 group-hover:scale-110" />
              </div>
            </Col>
          ))}
        </Row>
      </Col>

      <div className="flex-grow text-center">
        <Row justify="center" className="mb-2 mt-2">
          <Title level={3} className="text-center"> שינוי שם </Title>
        </Row>
      </div>

      <Row justify="center">
        <Col span={8}>
          <Row gutter={8} dir="ltr">
            <Col span={12}>
              <Input
                dir="rtl"
                placeholder="שם משפחה"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mb-2"
              />
            </Col>
            <Col span={12}>
              <Input
                dir="rtl"
                placeholder="שם פרטי"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mb-2"
              />
            </Col>
          </Row>
          <Card
            className="transition-all duration-300 ease-in-out hover:bg-green-600 bg-green-500 text-white border border-green-600 border-b-4 border-0 h-8 text-center flex justify-center items-center h-12"
            onClick={handleNameChange} 
            loading={loading} 
          >
            עדכן שם
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Flags;