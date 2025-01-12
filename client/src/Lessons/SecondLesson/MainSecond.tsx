// react  + antd
import React, { useEffect, useState } from 'react';
import { Row, Card, Typography } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess, setFailure, resetClicks, setRightAnswer } from '../slices/LessonsSlice';
import { RootState } from "../../app/store";

// components
import { findMaxIndex } from '../utils/SecondHelper';
import { useGetData, useHandleNext} from "../utils/SecondEffects";
import HebrewSentenceTwo from "./HebrewSentenceTwo";
import { CardType } from '../types/SecondLessonType';

// fetch data
import { useParams } from 'react-router-dom';
import { useFetchLessonData, useFetchWordsData } from '../api/fetchingLessons';


const MainSecond: React.FC = () => {

    const { name, lesson } = useParams<{ name: string; lesson: string }>();
    const { data: lessonsData } = useFetchLessonData(name || '', lesson || '');
    const { data: wordsData} = useFetchWordsData();

    const { Title } = Typography;

    const order = useSelector((state: RootState) => state.lessons.order);
    const clicks = useSelector((state: RootState) => state.lessons.clicks);
    const dispatch = useDispatch();

    const [germanArray, setGermanArray] = useState<CardType[]>([]);
    const [hebrewSentence, setHebrewSentence] = useState("");

    useGetData({ lessonsData, order, setGermanArray, setHebrewSentence, dispatch });
    useHandleNext ({ clicks, dispatch, resetClicks, setSuccess, setFailure, lessonsData, germanArray, order });

    const handleClick = (card: CardType) => {

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

            <HebrewSentenceTwo wordsData={wordsData}  hebrewSentence={hebrewSentence} />            
    
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

export default MainSecond;