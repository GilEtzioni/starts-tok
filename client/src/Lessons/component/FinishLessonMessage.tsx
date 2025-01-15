// react + antd
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { resetOrder, resetPoints } from '../slices/LessonsSlice';

// POST / PATCH
import { usePatchFinishLesson } from "../api/fetchingLessons";
import { useAddNewPoints } from '../api/fetchingPoints';

const FinishLessonMessage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const successCounter = useSelector((state: RootState) => state.speedGame.succcessCounter);
  const newPoints = useSelector((state: RootState) => state.lessons.points);

  const { mutate: finishLesson } = usePatchFinishLesson();
  const addNewPoints = useAddNewPoints();

  const { name, lesson } = useParams<{ name?: string; lesson?: string; }>(); 
  const myLesson = lesson ?? 'default-lesson';  
  const myLevel = name ?? 'default-level';         

  const status = useSelector((state: RootState) => state.lessons.status);
  const order = useSelector((state: RootState) => state.lessons.order);

  function goToHomePage() {
    console.log("newPoints: ", newPoints)
    addNewPoints.mutate({ newPoints });
    finishLesson({ name: myLevel, lesson: myLesson });

    dispatch(resetOrder());
    dispatch(resetPoints());
    navigate(`/main/course/${myLevel}`);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Modal
        visible={isModalVisible}
        className={classNames("w-full max-w-lg", "mx-auto", "mt-20")}
        footer={null}
        closable={false}
        maskClosable={true}
      >
        <div className={classNames("bg-transparent shadow-none")}>
          <div className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-200">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
              כל הכבוד! קיבלת {newPoints} נקודות
            </h1>
            <div className="flex flex-col gap-4">
              <Button
                onClick={goToHomePage}
                type="primary"
                className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 border-none shadow-md hover:shadow-lg rounded-lg transition-all duration-200"
              >
                המשך
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FinishLessonMessage;
