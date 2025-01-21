import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetOrder, setRunning } from "../slices/LessonsSlice";
import { Button } from 'antd';

const BackButton: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    dispatch(resetOrder());
    dispatch(setRunning());
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center p-5">
      <div >
        <Button
            className="!bg-black !text-white hover:!bg-gray-800 active:!bg-gray-900 !border-none !flex !items-center !justify-center !w-22 !h-8 !rounded-md !shadow-md !transition-all !duration-200"
            onClick={handleBack}
          >
            <p className="!text-white !text-center !m-0 font-semibold">חזור</p>
          </Button>
      </div>
    </div>
  );
};

export default BackButton;