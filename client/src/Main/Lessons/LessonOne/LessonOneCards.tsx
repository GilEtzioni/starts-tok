import React from 'react';
import { Card, Col } from 'antd';
import './LessonOneCards.css';

interface LessonOneCardsProps {
    shuffledHebrew: any[];
    shuffledGerman: any[];
    currentBlackHebrewId: string | null;
    currentBlackGermanId: string | null;
    handleHebrewClick: (id: string) => void;
    handleGermanClick: (id: string) => void;
}

const LessonOneCards: React.FC<LessonOneCardsProps> = ({
    shuffledHebrew,
    shuffledGerman,
    currentBlackHebrewId,
    currentBlackGermanId,
    handleHebrewClick,
    handleGermanClick,
}) => {
    return (
        <>
            {shuffledHebrew.map(([name, id, status], index) => (
                <React.Fragment key={id}>
                    <Col span={10} style={{ marginRight: '5%' }}>
                        <Card
                            onClick={() => handleHebrewClick(id)}
                            className={`card ${
                                status === "rightSelected"
                                    ? "card-right"
                                    : status === "wrongSelected"
                                    ? "card-wrong"
                                    : currentBlackHebrewId === id
                                    ? "card-selected"
                                    : ""
                            }`}
                        >
                            {name}
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Card
                            onClick={() => handleGermanClick(shuffledGerman[index][1])}
                            className={`card ${
                                shuffledGerman[index][2] === "rightSelected"
                                    ? "card-right"
                                    : shuffledGerman[index][2] === "wrongSelected"
                                    ? "card-wrong"
                                    : currentBlackGermanId === shuffledGerman[index][1]
                                    ? "card-selected"
                                    : ""
                            }`}
                        >
                            {shuffledGerman[index][0]}
                        </Card>
                    </Col>
                </React.Fragment>
            ))}
        </>
    );
};

export default LessonOneCards;
