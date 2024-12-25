// react  + antd
import React, { useState } from 'react';
import { Row, Card, Typography } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess, setFailure, resetClicks } from "../LessonsSlice";
import { RootState } from "../../app/store";

// components
import { LessonType } from '../types/lessonType';
import { findMaxIndex, getHebrewSentence , getUserAnswer} from './SecondHelper';
import { useGetData , useHandleNext} from "./SecondEffects";
import "./Second.css";

interface SecondCardContainerProps {
    lessonsData: LessonType[];
}

interface CardItem {
    id: number;
    containerOrder: number;
    word: string;
    container: string;
}

const SecondCardContainer: React.FC<SecondCardContainerProps> = ({ lessonsData }) => {

    const { Title } = Typography;

    const order = useSelector((state: RootState) => state.lessons.order);
    const clicks = useSelector((state: RootState) => state.lessons.clicks);
    const dispatch = useDispatch();

    const [germanArray, setGermanArray] = useState<CardItem[]>([]);
    const hebrewSentence = getHebrewSentence(lessonsData[0], order);

    useGetData({ lessonsData, order, setGermanArray });
    useHandleNext ({ clicks, dispatch, resetClicks, setSuccess, setFailure, lessonsData, germanArray, order });

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
            <Row justify="center" style={{ marginBottom: '10px' }}>
                <Title level={3} style={{ textAlign: 'center' }}>תרגמו את המשפט</Title>
            </Row>
    
            <p style={{ color: "black", textAlign: 'center' }}> {hebrewSentence} </p>
    
            {/* up container */}
            <div className="container up-container">
                {germanArray
                    .filter(item => item.container === "up")
                    .sort((a, b) => a.containerOrder - b.containerOrder)
                    .map(item => (
                        <div style={{ height: '50px' }}>
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
            <div className="container down-container">
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
