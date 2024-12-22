import React from 'react';
import { Row, Col } from 'antd';
import { LessonType } from '../types/lessonType';
import { getGermanWords, getHebrewWords, shuffleArray } from './FirstHelper';
import FirstCard from './FirstCard';

interface FirstCardContainerProps {
    lessons: LessonType[];
}

const FirstCardContainer: React.FC<FirstCardContainerProps> = ({ lessons }) => {
    // get and shuffle the words
    const originalGermanArray: Array<[number, string]> = lessons.flatMap(getGermanWords);
    const germanShuffledArray = shuffleArray(originalGermanArray);

    const hebrewArray: Array<[number, string]> = lessons.flatMap(getHebrewWords);
    const hebrewShuffledArray = shuffleArray(hebrewArray);

    return (
        <>
            <Row gutter={[4, 4]}>
                {/* german */}
                {germanShuffledArray.map(([id, german]) => (
                    <Col key={`german-${id}`} span={12}>
                        <FirstCard language={"german"} word={german} id={id} />
                    </Col>
                ))}

                {/* hebrew */}
                {hebrewShuffledArray.map(([id, hebrew]) => (
                    <Col key={`hebrew-${id}`} span={12}>
                        <FirstCard language={"hebrew"} word={hebrew} id={id}/>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default FirstCardContainer;
