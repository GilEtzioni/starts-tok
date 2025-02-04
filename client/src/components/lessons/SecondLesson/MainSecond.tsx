// react  + antd
import React, { useState } from 'react';
import { Row, Card, Typography, Skeleton } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess, setFailure, resetClicks, setRightAnswer } from '../slices/LessonsSlice';
import { RootState } from "../../../app/store";

// components
import { findMaxIndex } from '../utils/lessonsHelper';
import { useHandleNext} from "../utils/SecondEffects";
import HebrewSentenceTwo from "./HebrewSentenceTwo";
import { CardType, TranslatedArray } from '../types/SecondLessonType';
import { LessonStatus } from '../types/LessonType';
import { CardContainer } from '../types/SecondLessonType';

// fetch data
import { useParams } from 'react-router-dom';
import { fetchSecondLesson } from '../../../api/lessons';
import { SECOND_LESSON_QUERY_KEY } from '../requests/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { useWithAuth } from '../../../api/common/withAuth';

const MainSecond: React.FC = () => {

    const { name, lesson } = useParams<{ name: string;  lesson?: string }>();
    const { Title } = Typography;

    const order = useSelector((state: RootState) => state.lessons.order);
    const clicks = useSelector((state: RootState) => state.lessons.clicks);
    const status = useSelector((state: RootState) => state.lessons.status);
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

        <HebrewSentenceTwo TranslatedWords={TranslatedWords} />
    
        {/* up container */}
        <div className="flex flex-wrap justify-center items-start w-1/2 h-[150px] m-2.5 mx-auto gap-2.5 overflow-auto p-2.5 box-border border-none">
            {foreignArray
                .filter(item => item.container === CardContainer.Up)
                .sort((a, b) => a.containerOrder - b.containerOrder)
                .map(item => (
                    <div className="h-[50px]">
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
        <div className="flex flex-wrap justify-center items-start w-1/2 h-[150px] m-2.5 mx-auto gap-2.5 overflow-auto p-2.5 box-border border border-gray-300 rounded-lg mt-5">
            {[...Array(3)].map((_, index) => (
            <Button key={index} block active />
            ))}
        </div>
        :
        <div className="flex flex-wrap justify-center items-start w-1/2 h-[150px] m-2.5 mx-auto gap-2.5 overflow-auto p-2.5 box-border border border-gray-300 rounded-lg mt-5">
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

export default MainSecond;