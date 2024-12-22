// react  + antd
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import FirstCard from './FirstCard';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess, setFailure } from "../LessonsSlice";
import { RootState } from "../../app/store";

// components
import "./First.css"
import { LessonType } from '../types/lessonType';
import { getGermanWords, getHebrewWords, shuffleArray } from './FirstHelper';
interface FirstCardContainerProps {
    lessons: LessonType[];
}

const FirstCardContainer: React.FC<FirstCardContainerProps> = ({ lessons }) => {

    const status = useSelector((state: RootState) => state.lessons.status);
    const dispatch = useDispatch();
    
    const [germanId, setGermanID] = useState(0);
    const [hebrewId, setHebrewId] = useState(0);
    const [counter, setCounter] = useState(0);

    const [germanArray, setGermanArray] = useState<Array<{ id: number; word: string; isSelected: string }>>([]);
    const [hebrewArray, setHebrewArray] = useState<Array<{ id: number; word: string; isSelected: string }>>([]);

    useEffect(() => {
        // get the words
        const originalGermanArray: Array<[number, string, string]> = lessons.flatMap(getGermanWords);
        const originalHebrewArray: Array<[number, string, string]> = lessons.flatMap(getHebrewWords);

        // shuffle and transform the words
        const shuffledGerman = shuffleArray(originalGermanArray).map(([id, word, isSelected]) => ({ id, word, isSelected: isSelected ?? false }));
        const shuffledHebrew = shuffleArray(originalHebrewArray).map(([id, word, isSelected]) => ({ id, word, isSelected: isSelected ?? false }));

        setGermanArray(shuffledGerman);
        setHebrewArray(shuffledHebrew);
    }, [lessons]);

    const handleClick = (id: number, language: string) => {
        if (status === "running") {
            if (language === "german") {
                if (germanId === id) {
                    setGermanID(0); // if clicked the same word again - diselect it
                } else {
                    setGermanID(id); // if clicked a new word - select it
                }
            }

            if (language === "hebrew") {
                if (hebrewId === id) {
                    setHebrewId(0); // if clicked the same word again - diselect it
                } else {
                    setHebrewId(id); // if clicked a new word - select it
                }
            }
        }
    };

    useEffect(() => {
        if (germanId !== 0 && hebrewId !== 0) {
            // success
            if(germanId === hebrewId) {
                setCounter(prev => prev + 1);
                const updatedGermanArray = germanArray.map((item) =>
                    item.id === germanId ? { ...item, isSelected: "true" } : { ...item }
                );
                setGermanArray(updatedGermanArray);
    
                const updatedHebrewArray = hebrewArray.map((item) =>
                    item.id === hebrewId ? { ...item, isSelected: "true" } : { ...item }
                );
                setHebrewArray(updatedHebrewArray);
    
                setGermanID(0);
                setHebrewId(0);
                
                if (counter === 5) {
                    dispatch(setSuccess());
                }
            } 
        // failure
        else {
            dispatch(setFailure());
            const updatedGermanArray = germanArray.map((item) =>
                item.id === germanId ? { ...item, isSelected: "false" } : { ...item }
            );
            setGermanArray(updatedGermanArray);
    
            const updatedHebrewArray = hebrewArray.map((item) =>
                item.id === hebrewId ? { ...item, isSelected: "false" } : { ...item }
            );
            setHebrewArray(updatedHebrewArray);

            setGermanID(0);
            setHebrewId(0);
        }
    }},[germanId, hebrewId]);
    
    return (
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
    );
};

export default FirstCardContainer;
