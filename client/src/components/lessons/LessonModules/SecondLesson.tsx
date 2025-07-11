// react  + antd
import React, { useState } from 'react';
import { Row, Card, Typography, Skeleton, Grid } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess, setFailure, resetClicks, setRightAnswer } from '../slices/LessonsSlice';
import { RootState } from "../../../app/store";

// components
import { findMaxIndex } from '../utils/lessonsHelper';
import { useHandleNext} from "../utils/SecondEffects";
import FullHebrewSentence from "../common/TranslatedSenteces/FullHebrewSentence";
import { CardType, TranslatedArray } from '../types/SecondLessonType';
import { LessonStatus } from '../types/LessonType';
import { CardContainer } from '../types/SecondLessonType';

// fetch data
import { useParams } from 'react-router-dom';
import { fetchSecondLesson } from '../../../api/lessons';
import { SECOND_LESSON_QUERY_KEY } from '../requests/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { useWithAuth } from '../../../api/common/withAuth';
import classNames from 'classnames';

const SecondLesson: React.FC = () => {

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const { name, lesson } = useParams<{ name: string;  lesson?: string }>();
    const { Title } = Typography;
    const { status, order, clicks } = useSelector((state: RootState) => state.lessons);
    const dispatch = useDispatch();

    const [foreignArray, setForeignArray] = useState<CardType[]>([]);
    const [TranslatedWords, setTranslatedWords] = useState<TranslatedArray[]>([]);

    const withAuth = useWithAuth();
    const secondLesson = async () => withAuth((token) => fetchSecondLesson(lesson ?? "", token));
    
    const { data: lessonData, isLoading } = useQuery(
        [SECOND_LESSON_QUERY_KEY, name, lesson, clicks === 2 ],
        secondLesson,
        {
            staleTime: Infinity, 
            cacheTime: Infinity,
            onSuccess: (lessonData) => {     
                if (!lessonData) return;
                dispatch(resetClicks());
                dispatch(setRightAnswer(lessonData.foreignSentence));
                setForeignArray(lessonData.words);
                setTranslatedWords(lessonData.translatedArray);
            }
        }
    );

    useHandleNext ({ clicks, dispatch, resetClicks, setSuccess, setFailure, lessonData, foreignArray, order });

    const handleClick = (card: CardType) => {
        if (status === LessonStatus.Running) {
            // from down container to up container
            if (card.container === CardContainer.Down) {
                const currMax = findMaxIndex(foreignArray, card.id);
                const nextIndex = currMax + 1;

                const updatedArray= foreignArray.map((item) =>
                    item.id === card.id ? { ...item, container: CardContainer.Up, containerOrder: nextIndex } : { ...item }
                );                
                setForeignArray(updatedArray);
            }

            // from up to down container
            else {
                const currMax = findMaxIndex(foreignArray, card.id);
                const nextIndex = currMax + 1;

                const updatedArray= foreignArray.map((item) =>
                    item.id === card.id ? { ...item, container: CardContainer.Down, containerOrder: nextIndex } : { ...item }
                );                
                setForeignArray(updatedArray);
            }
        }
    }

    const { Button } = Skeleton

    return (
        <>
        <Row className="flex justify-center">
            <Title level={3} className="text-center">תרגמו את המשפט</Title>
        </Row>

        {isLoading ? (
        <div className="text-center my-5 !font-medium w-1/2 mx-auto">
          <Button block />
        </div>  
        ) : (
        <FullHebrewSentence TranslatedWords={TranslatedWords} />
        )}
    
        {/* up container */}
        <div 
         className={classNames(
            "flex flex-wrap justify-center items-start h-[150px] m-2.5 mx-auto gap-2.5 overflow-auto p-2.5 box-border border-none",
            isMobile ? "w-[90%]" : "w-1/2"
          )} >
        
            {foreignArray
                .filter(item => item.container === CardContainer.Up)
                .sort((a, b) => a.containerOrder - b.containerOrder)
                .map(item => (
                    <div className={classNames(isMobile ? "min-h-8 h-auto" : "h-[50px]")} >
                        <Card
                            bodyStyle={{ padding: '12px' }}
                            key={item.containerOrder}
                            onClick={() => handleClick(item)}
                            className='duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1'
                        >
                        {item.word}
                        </Card>
                    </div>
            ))}
        </div> 

        {/* down container */}
        {isLoading ?
        <div className={classNames(
        "flex flex-wrap justify-center items-start h-[150px] m-2.5 mx-auto gap-2.5 overflow-auto p-2.5 box-border border border-gray-300 rounded-lg mt-5",
        isMobile ? "w-[90%] min-h-20 h-auto" : "w-1/2"
        )}>
            {[...Array(3)].map((_, index) => (
            <Button key={index} block active />
            ))}
        </div>
        :
        <div 
        className={classNames(
            "flex flex-wrap items-center justify-center m-2.5 mx-auto overflow-auto box-border border border-gray-300 rounded-lg mt-5 gap-2.5 p-2.5",
            isMobile ? "w-[90%] min-h-20 h-auto" : "w-1/2 h-[150px]"
         )} >
            {foreignArray
                .filter(item => item.container === CardContainer.Down)
                .sort()
                .map(item => (
                    <Card
                        bodyStyle={{ padding: '12px' }}
                        key={item.id}
                        onClick={() => handleClick(item)}
                        className='duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1'
                    >
                        {item.word}
                    </Card>
                ))}
        </div>
        }
    </>
    );
}    

export default SecondLesson;