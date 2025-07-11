import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
interface BackButtonProps {
  onBack?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => { 
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = async () => {
    await queryClient.removeQueries();
    navigate(-1);
    if (onBack) {
      onBack();
    }
  };
  
  const { Paragraph } = Typography;

  return (
    <>
      <Button
        key={location.key}
        className={`!bg-black !text-white hover:!bg-gray-800 active:!bg-gray-900 !border-none !flex !items-center !justify-center !w-22 !h-8 !rounded-md !shadow-md !transition-all !duration-200`}
        onClick={handleBack}
      >
        <Paragraph className="!text-white !text-center !m-0 font-semibold">חזור</Paragraph>
      </Button>
    </>
  );
};

export default BackButton;