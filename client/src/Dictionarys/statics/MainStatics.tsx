import React, { useState } from "react";
import { Button, Modal, Card } from "antd";
import useFilteredWords from "../dicComponents/midComponents/dataEffect";
import { WordsType } from "../types/wordType";
import StaticsCards from "./StaticsCards";
import "../addWord/buttns.css";

interface MainStaticsProps {
  words?: Array<WordsType>;
}
const MainStatics: React.FC<MainStaticsProps> = ({ words = [] }) => {

  const { filteredWords } = useFilteredWords(words);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className="buttons" type="primary" onClick={showModal}>
        סטטיסטקה
      </Button>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        closable={false}
        maskClosable={true}
        width={800} 
        bodyStyle={{
          backgroundColor: "transparent", 
          boxShadow: "none",
        }}
      >
        <StaticsCards data={filteredWords} />
      </Modal>
    </>
  );
};

export default MainStatics;
