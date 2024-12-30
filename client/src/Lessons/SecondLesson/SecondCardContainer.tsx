// react  + antd
import React, { useEffect, useState } from 'react';
import { Row, Card, Typography } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess, setFailure, setRightAnswer, resetClicks } from '../dataLessons/LessonsSlice';
import { RootState } from "../../app/store";

// components
import { LessonType, WordsType } from '../types/lessonType';
import { findMaxIndex, getGermanSentence, getHebrewSentence } from './SecondHelper';
import { useGetData , useHandleNext} from "./SecondEffects";
import HebrewSentence from "./HebrewSentence";

interface SecondCardContainerProps {
    lessonsData: LessonType[];
    wordsData: WordsType[];
}

interface CardItem {
    id: number;
    containerOrder: number;
    word: string;
    container: string;
}

const SecondCardContainer: React.FC<SecondCardContainerProps> = ({ lessonsData, wordsData }) => {

    const { Title } = Typography;

    const order = useSelector((state: RootState) => state.lessons.order);
    const clicks = useSelector((state: RootState) => state.lessons.clicks);
    const dispatch = useDispatch();

    const [germanArray, setGermanArray] = useState<CardItem[]>([]);
    const hebrewSentence = getHebrewSentence(lessonsData[0], order);
    const germanSentence = getGermanSentence(lessonsData[0], order);

    useGetData({ lessonsData, order, setGermanArray });
    useHandleNext ({ clicks, dispatch, resetClicks, setSuccess, setFailure, lessonsData, germanArray, order });

    useEffect(() => {
        if (germanSentence) {
            dispatch(setRightAnswer(germanSentence));
        }
      }, [dispatch, germanSentence]);

    const handleClick = (card: CardItem) => {

        // from down container to up container
        if (card.container === "down") {
            const currMax = findMaxIndex(germanArray, card.id);
            const nextIndex = currMax + 1;

            const updatedArray= germanArray.map((item) =>
                item.id === card.id ? { ...item, container: "up",containerOrder: nextIndex } : { ...item }
            );                
            setGermanArray(updatedArray);
        }

        // from up to down container
        else {
            const currMax = findMaxIndex(germanArray, card.id);
            const nextIndex = currMax + 1;

            const updatedArray= germanArray.map((item) =>
                item.id === card.id ? { ...item, container: "down",containerOrder: nextIndex } : { ...item }
            );                
            setGermanArray(updatedArray);
        }
    }

    return (
        <>
            <Row className="flex justify-center">
                <Title level={3} className="text-center">תרגמו את המשפט</Title>
            </Row>

            <HebrewSentence wordsData={wordsData}  hebrewSentence={hebrewSentence} />
            {/* <p className="text-black text-center">{hebrewSentence}</p> */}
            
    
            {/* up container */}
            <div className="flex flex-wrap justify-center items-start w-1/2 h-[150px] m-2.5 mx-auto gap-2.5 overflow-auto p-2.5 box-border border-none">
                {germanArray
                    .filter(item => item.container === "up")
                    .sort((a, b) => a.containerOrder - b.containerOrder)
                    .map(item => (
                        <div className="h-[50px]">
                            <Card
                                bodyStyle={{ padding: '12px' }}
                                key={item.containerOrder}
                                onClick={() => handleClick(item)}
                                hoverable
                            >
                                {item.word}
                            </Card>
                        </div>
                    ))}
            </div>

    {/* down container */}
    <div className="flex flex-wrap justify-center items-start w-1/2 h-[150px] m-2.5 mx-auto gap-2.5 overflow-auto p-2.5 box-border border border-gray-300 rounded-lg mt-5">
        {germanArray
            .filter(item => item.container === "down")
            .sort((a, b) => a.containerOrder - b.containerOrder)
            .map(item => (
                <Card
                    bodyStyle={{ padding: '12px' }}
                    key={item.containerOrder}
                    onClick={() => handleClick(item)}
                    hoverable
                >
                    {item.word}
                </Card>
            ))}
    </div>

        </>
    );
}    

export default SecondCardContainer;
