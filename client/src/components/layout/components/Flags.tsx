import React from 'react';
import germanyPNG from "../../pages/MainPage/images/germanIcon.png";
import francePNG from "../../pages/MainPage/images/franceIcon.png";
import italyPNG from "../../pages/MainPage/images/italyIcon.png";
import spainPNG from "../../pages/MainPage/images/spainIcon.png";
import usaPNG from "../../pages/MainPage/images/usaIcon.png";
import { CourseLangauge } from '../../../api/common/types';
import { Image, Col, Row, Typography } from 'antd';
import { useChangeLanguage } from "../../../api/layout/mutateApi";

interface FlagsProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Flags: React.FC<FlagsProps> = ({ setIsModalVisible }) => {
  const changeLanguage = useChangeLanguage();
  const { Title } = Typography;

  const icons = [
    { src: germanyPNG, alt: "German", title: "גרמנית", language: CourseLangauge.German },
    { src: usaPNG, alt: "USA", title: "אנגלית (בקרוב)" },
    { src: francePNG, alt: "France", title: "צרפתית", language: CourseLangauge.French },
    { src: italyPNG, alt: "Italy", title: "איטלקית", language: CourseLangauge.Italian },
    { src: spainPNG, alt: "Spain", title: "ספרדית", language: CourseLangauge.Spanish },
  ];

  return (
    <div>
      <div className="flex-grow text-center">
        <Row justify="center" className="mb-2 mt-2">
          <Title level={3} className="text-center !font-hebrew"> החלף שפה </Title>
        </Row>
      </div>

      <Col>
        <Row justify="center" gutter={[32, 32]} className="gap-10">
          {icons.map((icon, index) => (
            <Col
              key={index}
              className="text-center p-4"
              style={{ position: "relative" }}
            >
              <Typography.Text className="block mb-2 !font-hebrew">{icon.title}</Typography.Text>
              <div className="relative group">
                <Image
                  onClick={() => {
                    if (icon.language) {
                      changeLanguage.mutate(icon.language);
                    }
                    setIsModalVisible(false); // Close modal
                  }}
                  width={100}
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
    </div>
  );
};

export default Flags;