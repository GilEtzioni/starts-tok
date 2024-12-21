// react + redux + ant
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess, setFailure } from "../../LessonsSlice";
import { RootState } from "../../../app/store";
import { Row, Typography } from 'antd';

// helping functions + data
import { fetchCourseData } from "../LessonsData";
import LessonOneCards from "./LessonOneCards";
import { filterByOrder, shuffleArray } from "./LessonOneHelper";

interface LessonOneCardsProps {
    levelName: string,
    courseName: string,
    completedLessons: number,
}

const LessonOneFront: React.FC<LessonOneCardsProps> = ({levelName, courseName, completedLessons}) => {

    const order = useSelector((state: RootState) => state.lessons.order);
    const dispatch = useDispatch();

    const [shuffledHebrew, setShuffledHebrew] = useState<any[]>([]);
    const [shuffledGerman, setShuffledGerman] = useState<any[]>([]);
    const [currentBlackHebrewId, setCurrentBlackHebrewId] = useState<string | null>(null);
    const [currentBlackGermanId, setCurrentBlackGermanId] = useState<string | null>(null);

    const { Title } = Typography;

    const [errorCount, setErrorCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { initialHebrewWords, initialGermanWords } = await fetchCourseData(levelName, courseName, completedLessons);

            const filteredHebrewWords = filterByOrder(initialHebrewWords, order);
            const filteredGermanWords = filterByOrder(initialGermanWords, order);
    
            setShuffledHebrew(shuffleArray(filteredHebrewWords));
            setShuffledGerman(shuffleArray(filteredGermanWords));

        } catch (error) {
            console.error('error fetch data:', error);
          }
        };
    
        fetchData();
      }, [order,levelName, courseName, completedLessons]);

      // example the logic of card array:
      // card[0] שלום 
      // card[1] 1 
      // card[2] notSelected

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
                    if (prev + 1 === 6) {
                        dispatch(setSuccess());
                    }
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
                // setError(true);
                dispatch(setFailure());
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
            <Row justify="center" style={{ marginBottom: '0px' }}>
                <Title level={3} style={{ textAlign: 'center' }}>התאימו את הזוגות</Title>
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
