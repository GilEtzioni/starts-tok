import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { LessonType } from '../types/lessonType';
import { getGermanWords, getHebrewWords, shuffleArray } from './FirstHelper';
import FirstCard from './FirstCard';
import "./First.css"
interface FirstCardContainerProps {
    lessons: LessonType[];
}

const FirstCardContainer: React.FC<FirstCardContainerProps> = ({ lessons }) => {
    const [germanId, setGermanID] = useState(0);
    const [hebrewId, setHebrewId] = useState(0);

const [germanArray, setGermanArray] = useState<Array<{ id: number; word: string; isSelected: string }>>([]);
const [hebrewArray, setHebrewArray] = useState<Array<{ id: number; word: string; isSelected: string }>>([]);

useEffect(() => {
    // Get the words
    const originalGermanArray: Array<[number, string, string]> = lessons.flatMap(getGermanWords);
    const originalHebrewArray: Array<[number, string, string]> = lessons.flatMap(getHebrewWords);

    // Shuffle and transform the words
    const shuffledGerman = shuffleArray(originalGermanArray).map(([id, word, isSelected]) => ({
        id,
        word,
        isSelected: isSelected ?? false, // Replace null with a default if needed
    }));
    const shuffledHebrew = shuffleArray(originalHebrewArray).map(([id, word, isSelected]) => ({
        id,
        word,
        isSelected: isSelected ?? false,
    }));

    setGermanArray(shuffledGerman);
    setHebrewArray(shuffledHebrew);
}, [lessons]);

    const handleClick = (id: number, language: string) => {
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
    };

    useEffect(() => {
        if (germanId !== 0 && hebrewId !== 0) {
            if(germanId === hebrewId) {
                if(germanId === hebrewId) {
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
                console.log("equal");
            }
        }
         else {
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
            console.log("not equal");
        }
    }},[germanId, hebrewId]);
    
    return (
        <Row gutter={[4, 4]}>
            {germanArray.map((germanItem, index) => {
                const hebrewItem = hebrewArray[index]; // Match the corresponding Hebrew word by index
                return (
                    <>
                        {/* German word */}
                        <Col key={`german-${germanItem.id}`} span={12}>
                            <FirstCard
                                language="german"
                                word={germanItem.word}
                                id={germanItem.id}
                                isSelected={germanItem.isSelected}
                                onClick={handleClick}
                            />
                        </Col>
    
                        {/* Hebrew word */}
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
