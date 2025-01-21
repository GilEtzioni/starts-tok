// React + Ant Design
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card } from "antd"; 

// Redux slices
import { addOneClick } from "../slices/LessonsSlice";
import { RootState } from "../../../app/store";

const NextButton: React.FC = () => {

  const order = useSelector((state: RootState) => state.lessons.order);
  const clicks = useSelector((state: RootState) => state.lessons.clicks);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center p-6">
      {(order !== 1 && order !== 4 && clicks === 0) && (
        <Card
          className="!flex !items-center !justify-center h-8 !w-44
          bg-green-500 text-white border-green-600 border-b-4 border-0 hover:!bg-green-600 hover:!cursor-pointer
          font-semibold !text-white !text-center !m-0 !font-medium"
          onClick={() => dispatch(addOneClick())}
        >
          בדוק
        </Card>
      )}
    </div>
  );
}

export default NextButton;