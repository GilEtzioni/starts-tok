import React, { useState } from "react";
import { Button, Modal, Card } from "antd";
import useFilteredWords from "../dicComponents/midComponents/dataEffect";
import { WordsType } from "../types/wordType";
import StaticsCards from "./StaticsCards";
import "../../index.css";

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
      <Button 
      className="bg-[hsl(213.1,93.9%,67.8%)] text-white border-none px-4 py-2 text-base font-bold rounded-full 
      transition-all duration-300 ease-in-out hover:bg-[hsl(201.3,96.3%,32.2%)] hover:-translate-y-0.5" 
      type="primary" onClick={showModal}>
        סטטיסטקה
      </Button>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        closable={false}
        maskClosable={true}
        width={1200} 
        height={600}
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
