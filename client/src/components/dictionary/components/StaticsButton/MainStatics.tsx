import React, { useState } from "react";
import { Button, Modal, Card } from "antd";
import useFilteredWords from "../../utils/dataEffect";
import { WordsType } from "../../../../api/common/types";
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
    <Card
      onClick={showModal}
     className="duration-300 ease-in-out hover:-translate-y-0.5 bg-[#60a5fa] text-white border border-blue-500 border-b-4 border-0 h-8 text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear !font-hebrew hover:bg-blue-500 hover:cursor-pointer"
      >
      סטטיסטקה
    </Card>


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
