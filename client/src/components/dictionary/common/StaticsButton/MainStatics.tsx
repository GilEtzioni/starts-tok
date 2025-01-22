import React, { useState } from "react";
import { Modal, Card } from "antd";
import StaticsTable from "./StaticsTable"
import { useQuery } from "@tanstack/react-query";
import { fetchDictionary } from "../../../../api/dictionary";
import { ALL_DICTIONARY_WORDS } from "../../requests/queryKeys";

const MainStatics: React.FC = () => {

  const { data: words } = useQuery(
    [ALL_DICTIONARY_WORDS],
    () => fetchDictionary())

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
     className="duration-300 ease-in-out hover:-translate-y-0.5 bg-[#60a5fa] text-white border border-blue-500 border-b-4 border-0 h-8 text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear hover:bg-blue-500 hover:cursor-pointer"
      >
      סטטיסטיקה <i className="fa-solid fa-chart-simple"></i>
    </Card>

      <div className="absolute">
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
          <StaticsTable data={words || []} />
        </Modal>
      </div>
    </>
  );
};

export default MainStatics;
