// react + antd
import { Card, Col, Modal, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { resetOrder, resetPoints } from '../../slices/LessonsSlice';

import { useAddNewPoints } from '../../requests/addPointsMutate';
import { usePatchFinishLesson } from '../../requests/finishLessonMutate';

const FinishLessonMessage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [lessonTime, setLessontime] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { points, time } = useSelector((state: RootState) => state.lessons);

  const { mutate: finishLesson } = usePatchFinishLesson();
  const { mutate: addNewPoints } = useAddNewPoints();

  const { name, lesson } = useParams<{ name?: string; lesson?: string; }>(); 
  const myLesson = lesson ?? 'default-lesson';  
  const myLevel = name ?? 'default-level';     

  useEffect(() => {
    const now = new Date().getTime();
    const distance = time - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes === -1) {
      minutes = 0
    }
    const seconds = Math.floor((distance % (1000 * 60)) / 1000) * -1;
  
    setLessontime(`${minutes}:${seconds}`);
  }, [time]);

  const goToHomePage = () => {
    addNewPoints({ newPoints: points });
    finishLesson({ name: myLevel, lesson: myLesson });

    dispatch(resetOrder());
    dispatch(resetPoints());
    navigate(`/main/course/${myLevel}`);
  }

  const { Title, Paragraph } = Typography;

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
            <Title level={3} className="text-3xl font-extrabold text-gray-900 mb-6">
              !כל הכבוד
            </Title>

            <Row gutter={[16, 16]} justify="center">
              <Col flex="1 1 100px">
                <Card className="relative h-24 w-full transition-all bg-white text-red-500 border border-red-500 border-2 text-center flex flex-col justify-center items-center">
                  <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-1 text-base font-bold text-center">
                    ניקוד
                  </div>
                  <div className="mt-2 flex flex-col justify-center items-center h-full pt-4">
                    <Paragraph className="!text-red-500 text-xl !text-center !m-0 font-semibold flex items-center">
                      {points} <i className="fas fa-star ml-1"></i>
                    </Paragraph>
                  </div>
                </Card>
              </Col>

              <Col flex="1 1 100px">
                <Card className="relative h-24 w-full transition-all bg-white text-blue-500 border border-blue-500 border-2 text-center flex flex-col justify-center items-center">
                  <div className="absolute top-0 left-0 w-full bg-blue-500 text-white p-1 text-base font-bold text-center">
                    זמן
                  </div>
                  <div className="mt-2 flex flex-col justify-center items-center h-full pt-4">
                    <Paragraph className="!text-blue-500 text-xl !text-center !m-0 font-semibold flex items-center">
                      {lessonTime} <i className="fa-solid fa-clock ml-1"></i>
                    </Paragraph>
                  </div>
                </Card>
              </Col>

              <Col flex="1 1 100px">
                <Card className="relative h-24 w-full transition-all bg-white text-green-500 border border-green-500 border-2 text-center flex flex-col justify-center items-center">
                  <div className="absolute top-0 left-0 w-full bg-green-500 text-white p-1 text-base font-bold text-center">
                    הצלחה
                  </div>
                  <div className="mt-2 flex flex-col justify-center items-center h-full pt-4">
                    <Paragraph className="!text-green-500 text-xl !text-center !m-0 font-semibold flex items-center">
                    {((points / 8) * 100).toFixed(0)}%  <i className="fa-solid fa-square-check ml-1"></i>
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            </Row>

            <div className="flex items-center justify-center">
              <Card
                onClick={goToHomePage}
                className="mt-8 transition-all duration-300 ease-in-out hover:bg-green-600 bg-green-500 text-white border border-green-600 border-b-4 border-0 h-8 text-center flex justify-center items-center h-12 w-36"
              >
                המשך
              </Card>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FinishLessonMessage;