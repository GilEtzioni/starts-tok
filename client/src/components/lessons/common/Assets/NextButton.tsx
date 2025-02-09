// React + Ant Design
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from "antd"; 

// Redux slices
import { addOneClick } from "../../slices/LessonsSlice";
import { RootState } from "../../../../app/store";
import { LessonName } from '../../types/LessonType';

const NextButton: React.FC = () => {

  const order = useSelector((state: RootState) => state.lessons.order);
  const lessonName = useSelector((state: RootState) => state.lessons.lessonName);
  const clicks = useSelector((state: RootState) => state.lessons.clicks);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center p-6">
      {(lessonName !== LessonName.MatchPairs && lessonName !== LessonName.MissingCards) && (
        <Card
          className="transition-all duration-300 ease-in-out !flex !items-center !justify-center h-8 !w-44
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