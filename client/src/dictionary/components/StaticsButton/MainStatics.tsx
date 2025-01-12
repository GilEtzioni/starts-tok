import React, { useState } from "react";
import { Button, Modal } from "antd";
import useFilteredWords from "../../utils/dataEffect";
import { WordsType } from "../../../types/types";
import StaticsCards from "./StaticsCards";

interface MainStaticsProps {
  words?: WordsType[] | undefined;
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
        className="bg-transparent shadow-none"
      >
        <StaticsCards data={filteredWords} />
      </Modal>
    </>
  );
};

export default MainStatics;
