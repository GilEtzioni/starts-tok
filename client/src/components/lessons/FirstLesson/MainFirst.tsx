// react  + antd
import React, { useState } from 'react';
import { Row, Col, Typography, Skeleton } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../app/store";

// components + functions
import FirstCard from "./FirstCard"
import { useHandleClick} from '../utils/FirstEffects';
import { FirstLessonCard, IsSelected } from "../types/FirstLessonType";
import { LessonStatus } from '../types/LessonType';
import { LanguageType } from '../../../api/common/types';

// fetch
import { useParams } from 'react-router-dom';
import { fetchFirstLesson } from '../../../api/lessons'; 
import { useQuery } from '@tanstack/react-query';
import { FIRST_LESSON_QUERY_KEY } from '../requests/queryKeys';

const FirstCardContainer: React.FC = () => {

    const { name, lesson } = useParams<{ name: string; lesson: string }>();

    const status = useSelector((state: RootState) => state.lessons.status);
    const order = useSelector((state: RootState) => state.lessons.order);
    const dispatch = useDispatch();
    

    const [foreignId, setForeignID] = useState(0);
    const [hebrewId, setHebrewId] = useState(0);
    const [counter, setCounter] = useState(0);
    const [foreignArray, setForeignArray] = useState<FirstLessonCard[]>([]);
    const [hebrewArray, setHebrewArray] = useState<FirstLessonCard[]>([]);

    const { Title } = Typography;

    const { data: lessons, isLoading } = useQuery(
        [FIRST_LESSON_QUERY_KEY, name, lesson],
        () => fetchFirstLesson(lesson || ''),
        {
          onSuccess: (lessons) => {
            if (!lessons) return;
            setForeignArray(lessons.foreign);
            setHebrewArray(lessons.hebrew);
          }
        }
    );

    useHandleClick({ order,foreignId,hebrewId, foreignArray, hebrewArray, counter, setForeignID, setHebrewId,
        setCounter, setForeignArray, setHebrewArray, dispatch,  status });

        const handleClick = (id: number, language: string) => {
            // update foreign array
            if (status === LessonStatus.Running && language === LanguageType.Foreign) {
                const updatedForeignArray = foreignArray.map((item) => {
                // if it's a new card, select it. if re-clicked, reset it
                if (
                    item.coupleId === id &&
                    item.isSelected !== IsSelected.False &&
                    item.isSelected !== IsSelected.True
                ) {
                    return {
                    ...item,
                    isSelected:
                        item.isSelected === IsSelected.Clicked
                        ? IsSelected.NotSelected
                        : IsSelected.Clicked,
                    };
                }
                // reset the clicked state if re-clicked
                if (item.isSelected === IsSelected.Clicked) {
                    return { ...item, isSelected: IsSelected.NotSelected };
                }
                return item;
                });
            
                setForeignArray(updatedForeignArray);
            
                console.log("6")
                const selectedCard = updatedForeignArray.find((item) => item.coupleId === id);
                setForeignID(selectedCard?.isSelected === IsSelected.Clicked ? id : 0);
            }

            // update hebrew
            if (status === LessonStatus.Running && language === LanguageType.Hebrew) {
                const updatedHebrewArray = hebrewArray.map((item) => {
                    // if it's a new card select it, if it re-click reset it
                    if (item.coupleId === id && item.isSelected !== IsSelected.False && item.isSelected !== IsSelected.True) {
                        return { ...item, isSelected: item.isSelected === IsSelected.Clicked ? IsSelected.NotSelected : IsSelected.Clicked };
                    }
                    // reset the clicked
                    if (item.isSelected === IsSelected.Clicked) {
                        return { ...item, isSelected: IsSelected.NotSelected };
                    }
                    if (item.isSelected === IsSelected.False || item.isSelected === IsSelected.True ) {
                        return { ...item };
                    }
                    return item;
                }
            );
            console.log("7")
                setHebrewArray(updatedHebrewArray);
                        const selectedCard = updatedHebrewArray.find((item) => item.coupleId === id);
                setHebrewId(selectedCard?.isSelected === IsSelected.Clicked ? id : 0);
            }
        };
      
    const { Button } = Skeleton;

    return (
        <div className="px-[10%]">
          <Row justify="center" className="mb-2.5">
            <Title level={3} className="text-center">
              התאימו את הזוגות
            </Title>
          </Row>
    
          <Row gutter={[4, 4]}>
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <React.Fragment key={`skeleton-${index}`}>
                    <Col span={12}>
                      <Button
                        block
                        active
                        className="w-full h-12"
                        size="large"
                      />
                    </Col>
                    <Col span={12}>
                      <Button
                        block
                        active
                        className="w-full h-12"
                        size="large"
                      />
                    </Col>
                  </React.Fragment>
                ))
              : foreignArray.map((foreignItem, index) => {
                  const hebrewItem = hebrewArray[index];
                  return (
                    <>
                      <Col key={`foreign-${foreignItem.coupleId}`} span={12}>
                        <FirstCard
                          language={LanguageType.Foreign}
                          word={foreignItem.word}
                          id={foreignItem.coupleId}
                          isSelected={foreignItem.isSelected}
                          onClick={handleClick}
                        />
                      </Col>
                      <Col key={`hebrew-${hebrewItem.coupleId}`} span={12}>
                        <FirstCard
                          language={LanguageType.Hebrew}
                          word={hebrewItem.word}
                          id={hebrewItem.coupleId}
                          isSelected={hebrewItem.isSelected}
                          onClick={handleClick}
                        />
                      </Col>
                    </>
                  );
                })}
          </Row>
        </div>
      );
    };
    
export default FirstCardContainer;