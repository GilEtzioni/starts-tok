import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { fetchCourseData } from "../LessonsData";
import LessonOneCards from "./LessonOneCards";
import { filterByOrder, shuffleArray } from "./LessonOneHelper";

interface LessonOneFrontProps {
    setFinished: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    order: string;
}

const LessonOneFront: React.FC<LessonOneFrontProps> = ({ setFinished, setError, order }) => {
    const [shuffledHebrew, setShuffledHebrew] = useState<any[]>([]);
    const [shuffledGerman, setShuffledGerman] = useState<any[]>([]);
    const [currentBlackHebrewId, setCurrentBlackHebrewId] = useState<string | null>(null);
    const [currentBlackGermanId, setCurrentBlackGermanId] = useState<string | null>(null);
    const [errorCount, setErrorCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { initialHebrewWords, initialGermanWords } = await fetchCourseData('A1', 'Greetings');

                const filteredHebrewWords = filterByOrder(initialHebrewWords, order);
                const filteredGermanWords = filterByOrder(initialGermanWords, order);

                setShuffledHebrew(shuffleArray(filteredHebrewWords));
                setShuffledGerman(shuffleArray(filteredGermanWords));
            } catch (error) {
                console.error('Error fetching course data:', error);
                setError(true);
            }
        };

        fetchData();
        setError(false);
    }, [order, setError]);

    const handleMatchCheck = () => {
        if (currentBlackHebrewId && currentBlackGermanId) {
            if (currentBlackHebrewId === currentBlackGermanId) {
                setShuffledHebrew((prev) =>
                    prev.map((card) =>
                        card[1] === currentBlackHebrewId ? [card[0], card[1], "rightSelected"] : card
                    )
                );
                setShuffledGerman((prev) =>
                    prev.map((card) =>
                        card[1] === currentBlackGermanId ? [card[0], card[1], "rightSelected"] : card
                    )
                );
                setSuccessCount((prev) => {
                    if (prev + 1 === 6) setFinished(true);
                    return prev + 1;
                });
            } else {
                setShuffledHebrew((prev) =>
                    prev.map((card) =>
                        card[1] === currentBlackHebrewId ? [card[0], card[1], "wrongSelected"] : card
                    )
                );
                setShuffledGerman((prev) =>
                    prev.map((card) =>
                        card[1] === currentBlackGermanId ? [card[0], card[1], "wrongSelected"] : card
                    )
                );
                setError(true);
                setErrorCount((prev) => prev + 1);
            }

            setCurrentBlackHebrewId(null);
            setCurrentBlackGermanId(null);
        }
    };

    const handleGermanClick = (id: string) => {
        if (errorCount === 0 && successCount !== 6)
            setCurrentBlackGermanId((prev) => (prev === id ? null : id));
    };

    const handleHebrewClick = (id: string) => {
        if (errorCount === 0 && successCount !== 6)
            setCurrentBlackHebrewId((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        handleMatchCheck();
    }, [currentBlackHebrewId, currentBlackGermanId]);

    return (
        <>
            {/* Centered Title */}
            <Row justify="center" style={{ marginBottom: '0px' }}>
                <h1 style={{ textAlign: 'center' }}>התאימו את הזוגות</h1>
            </Row>
    
            {/* Cards */}
            <Row gutter={[16, 16]} justify="center" style={{ padding: '0 10%' }}>
                <LessonOneCards
                    shuffledHebrew={shuffledHebrew}
                    shuffledGerman={shuffledGerman}
                    currentBlackHebrewId={currentBlackHebrewId}
                    currentBlackGermanId={currentBlackGermanId}
                    handleHebrewClick={handleHebrewClick}
                    handleGermanClick={handleGermanClick}
                />
            </Row>
        </>
    );
}

export default LessonOneFront;
