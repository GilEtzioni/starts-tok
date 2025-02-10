// react + antd
import React, { useState } from 'react';
import { Row, Typography, Skeleton, Col, Grid } from 'antd';
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setRightAnswer, resetClicks, addOneClick } from "../slices/LessonsSlice";
import { RootState } from "../../../app/store";

// components + utils
import MissingHebrewSentence from '../common/TranslatedSenteces/MissingHebrewSentence';
import { TranslatedArray } from '../types/SecondLessonType';
import ForthLessonCard from '../common/Assets/ForthLessonCard';

// fetch
import { fetchForthLesson } from '../../../api/lessons';
import { FORTH_LESSON_QUERY_KEY } from '../requests/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { useWithAuth } from '../../../api/common/withAuth';
import { ForthLessonCards } from '../../../api/common/types';
import { IsSelected } from '../types/FirstLessonType';
import { LessonStatus } from '../types/LessonType';
import classNames from 'classnames';

const ForthLesson: React.FC = () => {

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const { name, lesson } = useParams<{ name: string; lesson?: string }>();
  const { clicks, status } = useSelector((state: RootState) => state.lessons);
  const dispatch = useDispatch();

  const [foreignWord, setForeignWord] = useState<string>("");
  const [firstPartForeign, setFirstPartForeign] = useState<string>("");
  const [secondPartForeign, setSecondPartForeign] = useState<string>("");
  const [translatedWords, setTranslatedWords] = useState<TranslatedArray[]>([]);
  const [foreignArray, setForeignArray] = useState<ForthLessonCards[]>([]);

  const withAuth = useWithAuth();
  const forthLesson = async () => withAuth((token) => fetchForthLesson(lesson ?? "", token));

  const { data: lessonsData, isLoading } = useQuery(
    [FORTH_LESSON_QUERY_KEY, name, lesson, clicks === 2],
    forthLesson,
    {
      staleTime: Infinity, 
      cacheTime: Infinity,
      onSuccess: (lessonsData) => { 
        if (!lessonsData) return;
        setForeignArray(lessonsData.gameWords);
        setForeignWord(lessonsData.foreignWord);
        dispatch(resetClicks());
        dispatch(setRightAnswer(lessonsData.foreignWord));
        setTranslatedWords(lessonsData.translatedArray);
        setFirstPartForeign(lessonsData.firstPartForeign);
        setSecondPartForeign(lessonsData.secondPartForeign);
      }      
    }
  );

  const handleClick = async (isRightWord: boolean, foreignWord: string) => {
    if (status !== LessonStatus.Running) return;
    dispatch(addOneClick())
    const updatedForeignArray = foreignArray.map((item) => {
    if (item.foreignWord.toLowerCase() === foreignWord.toLowerCase()) {
      return {
      ...item,
      isSelected: isRightWord ? IsSelected.True : IsSelected.False
      };
    }
    return item;
    });
    setForeignArray(updatedForeignArray);
  }
  
  const { Paragraph, Title } = Typography;
  const { Button } = Skeleton

  return (
    <div className="text-center h-[400px]">
      {/* first section */}
      <Row className="flex justify-center">
        <Title level={3} className="text-center">לחצו על המילה המתאימה</Title>
      </Row>

      {/* second section */}
      {isLoading ? (
        <div className="text-center my-5 !font-medium w-1/2 mx-auto">
          <Button block />
        </div>  
      ) : (
        <MissingHebrewSentence translatedWords={translatedWords} />
      )}

      {/* third section */}
      {isLoading ? (
        <div className="flex flex-wrap justify-center items-start w-1/2 h-[70px] m-2.5 mx-auto gap-2.5 p-2.5 box-border border border-gray-300 rounded-lg">
          <Button block className='mt-1'/>
        </div>
      ) : (
        <div 
        className={classNames(
            "flex flex-wrap justify-center items-start w-1/2 h-[70px] m-2.5 mx-auto gap-2.5 p-2.5 box-border border border-gray-300 rounded-lg",
            isMobile ? "w-[90%] min-h-20 h-auto" : "w-1/2h-[70px]"
         )} >
        <Paragraph className="p-2 text-lg">
          {firstPartForeign}
          <span
            className="border-0 border-b-2 border-black text-[16px] text-center mx-2 text-lg inline-block"
            style={{ width: `${foreignWord.length * 10}px` }}
          >
            &nbsp;
          </span>
          {secondPartForeign}
        </Paragraph>
      </div>
      )}

    {/* forth section */}
    <div className="flex flex-col justify-center items-center text-center mt-5">
    {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <React.Fragment key={`skeleton-${index}`}>
            <Col span={8} className="w-full">
                <Button
                block
                className="w-full h-12"
                size="large"
                />
            </Col>
            </React.Fragment>
        ))
        : foreignArray.map((item, index) => (
            <React.Fragment key={`foreign-item-${index}`}>
            <Col span={8} className="w-full mb-2 mt-2`">
              <ForthLessonCard
                isSelected={item.isSelected}
                isRightWord={item.isRightWord} 
                word={item.foreignWord} 
                onClick={() => handleClick(item.isRightWord, item.foreignWord)} 
              />
            </Col>
            </React.Fragment>
        ))
        }
        </div>
    </div>
  );
};

export default ForthLesson;