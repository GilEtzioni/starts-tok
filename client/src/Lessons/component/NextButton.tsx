// React + Ant Design
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "antd"; 

// Redux slices
import { setRunning, addOneOrder, resetClicks, addOneClick } from "../slices/LessonsSlice";
import { RootState } from "../../app/store";

interface NextButtonProps {
  onClick?: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {

  const order = useSelector((state: RootState) => state.lessons.order);
  const clicks = useSelector((state: RootState) => state.lessons.clicks);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center p-5">
      {(order !== 1 && order !== 4 && clicks === 0) && (
        <Button
          className="!bg-black !text-white hover:!bg-gray-800 active:!bg-gray-900 !border-none !flex !items-center !justify-center !w-22 !h-8 !rounded-md !shadow-md !transition-all !duration-200"
          onClick={() => dispatch(addOneClick())}
        >
          <p className="!text-white !text-center !m-0 !font-medium">הבא</p>
        </Button>
      )}
    </div>
  );
}

export default NextButton;