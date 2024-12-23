// react  + antd
import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import FirstCard from './FirstCard';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../app/store";

// components
import "./First.css";
import { LessonType } from '../types/lessonType';
import { useGetData , useHandleClick} from './FirstEffects';

interface FirstCardContainerProps {
    lessonsData: LessonType[];
}

const FirstCardContainer: React.FC<FirstCardContainerProps> = ({ lessonsData }) => {
    // redux
    const status = useSelector((state: RootState) => state.lessons.status);
    const order = useSelector((state: RootState) => state.lessons.order);
    const dispatch = useDispatch();
    
    // states for handle click
    const [germanId, setGermanID] = useState(0);
    const [hebrewId, setHebrewId] = useState(0);
    const [counter, setCounter] = useState(0);

    // contain the data
    const [germanArray, setGermanArray] = useState<Array<{ id: number; word: string; isSelected: string }>>([]);
    const [hebrewArray, setHebrewArray] = useState<Array<{ id: number; word: string; isSelected: string }>>([]);

    const { Title } = Typography; // antd title

    // custom hook - get the data
    useGetData({lessonsData, order,germanId,hebrewId, germanArray, hebrewArray, counter, setGermanID, setHebrewId,
        setCounter, setGermanArray, setHebrewArray, dispatch,  status });

    // custom hook - manage the game
    useHandleClick({ lessonsData, order,germanId,hebrewId, germanArray, hebrewArray, counter, setGermanID, setHebrewId,
        setCounter, setGermanArray, setHebrewArray, dispatch,  status });

        // handle the clicks
        const handleClick = (id: number, language: string) => {
            // update german        
            if (status === "running" && language === "german") {
                const updatedGermanArray = germanArray.map((item) => {
                    // if it's a new card select it, if it re-click reset it
                    if (item.id === id && item.isSelected !== "false" && item.isSelected !== "true") {
                        return { ...item, isSelected: item.isSelected === "clicked" ? "" : "clicked" };
                    }
                    // reset the clicked if re-click
                    if (item.isSelected === "clicked") {
                        return { ...item, isSelected: "" };
                    }
                    // else
                    return item;
                });
                // update the array and the ID
                setGermanArray(updatedGermanArray);
                        const selectedCard = updatedGermanArray.find((item) => item.id === id);
                setGermanID(selectedCard?.isSelected === "clicked" ? id : 0);
                    }

            // update hebrew
            if (status === "running" && language === "hebrew") {
                const updatedHebrewArray = hebrewArray.map((item) => {
                    // if it's a new card select it, if it re-click reset it
                    if (item.id === id && item.isSelected !== "false" && item.isSelected !== "true") {
                        return { ...item, isSelected: item.isSelected === "clicked" ? "" : "clicked" };
                    }
                    // reset the clicked
                    if (item.isSelected === "clicked") {
                        return { ...item, isSelected: "" };
                    }
                    if (item.isSelected === "false" || item.isSelected === "true" ) {
                        return { ...item };
                    }
                    // else
                    return item;
                }
            );
                // update the array and the ID
                setHebrewArray(updatedHebrewArray);
                        const selectedCard = updatedHebrewArray.find((item) => item.id === id);
                setHebrewId(selectedCard?.isSelected === "clicked" ? id : 0);
            }
        };
        

    return (
    <div>
        <Row justify="center" style={{ marginBottom: '10px' }}>
            <Title level={3} style={{ textAlign: 'center' }}  >  התאימו את הזוגות </Title>
        </Row>

        <Row gutter={[4, 4]}>
            {germanArray.map((germanItem, index) => {
                const hebrewItem = hebrewArray[index]; 
                return (
                    <>
                        {/* german */}
                        <Col key={`german-${germanItem.id}`} span={12}>
                            <FirstCard
                                language="german"
                                word={germanItem.word}
                                id={germanItem.id}
                                isSelected={germanItem.isSelected}
                                onClick={handleClick}
                            />
                        </Col>
                        
    
                        {/* hebrew */}
                        {hebrewItem && (
                            <Col key={`hebrew-${hebrewItem.id}`} span={12}>
                                <FirstCard
                                    language="hebrew"
                                    word={hebrewItem.word}
                                    id={hebrewItem.id}
                                    isSelected={hebrewItem.isSelected}
                                    onClick={handleClick}
                                />
                            </Col>
                        )}
                    </>
                );
            })}
        </Row>
    </div>
    );
};

export default FirstCardContainer;
