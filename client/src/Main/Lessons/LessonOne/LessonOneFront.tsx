import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { fetchCourseData } from "../MainClass";
import ErrorMessage from "../ErrorMessage";

const fetchDataExample = async () => {
    const { initialHebrew, initialGerman } = await fetchCourseData('default-level', 'default-lesson');

    console.log('Hebrew Words:', initialHebrew);
    console.log('German Words:', initialGerman);
};

fetchDataExample();

interface LessonOneFrontProps {
    finished: boolean;
    setFinished: React.Dispatch<React.SetStateAction<boolean>>;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
}

// shuffle an array
const shuffleArray = (array: any[]) => {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

const LessonOneFront: React.FC<LessonOneFrontProps> = ({ finished, setFinished, error, setError }) => {
    const [shuffledHebrew, setShuffledHebrew] = useState<any[]>([]);
    const [shuffledGerman, setShuffledGerman] = useState<any[]>([]);
    const [currentBlackHebrewId, setCurrentBlackHebrewId] = useState<string | null>(null);
    const [currentBlackGermanId, setCurrentBlackGermanId] = useState<string | null>(null);
    const [errorCount, setErrorCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);

    // reload the data when the file is opened
    useEffect(() => {
        const fetchData = async () => {
            const { initialHebrew, initialGerman } = await fetchCourseData('A1', 'Colors');
            setShuffledHebrew(shuffleArray(initialHebrew));
            setShuffledGerman(shuffleArray(initialGerman));
        };
        fetchData();
    }, []);

    const handleMatchCheck = () => {
        if (currentBlackHebrewId && currentBlackGermanId) {

            // correct match - add green background
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
                setSuccessCount((prev) => prev + 1);

            // wrong match - add red background
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
                setError(true); // call <ErrorMessage />
                setErrorCount((prev) => prev + 1);
            }

            // reset black card state
            setCurrentBlackHebrewId(null);
            setCurrentBlackGermanId(null);
        }
    };

    const handleGermanClick = (id: string) => {
        if (errorCount === 0 && successCount !== 6) // if the user wrong / finished
            setCurrentBlackGermanId((prev) => (prev === id ? null : id));
    };

    const handleHebrewClick = (id: string) => {
        if (errorCount === 0 && successCount !== 6) // if the user wrong / finished
            setCurrentBlackHebrewId((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        handleMatchCheck();
    }, [currentBlackHebrewId, currentBlackGermanId]);

    return (
        <Row gutter={[16, 16]} justify="center" style={{ padding: '0 10%' }}>
            {shuffledHebrew.map(([name, id, status], index) => (
                <React.Fragment key={id}>
                    <Col span={10} style={{ marginRight: '5%' }}>
                    <Card
                            onClick={() => handleHebrewClick(id)}
                            hoverable
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid hsl(240, 5%, 64.9%)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease, background-color 0.3s ease',
                                height: '50px',
                                backgroundColor:
                                    status === "rightSelected"
                                        ? 'hsl(142.1, 70.6%, 45.3%)' // green
                                        : status === "wrongSelected"
                                        ? 'hsl(0, 70%, 50%)' // red
                                        : currentBlackHebrewId === id
                                        ? 'black'
                                        : 'white',
                                color:
                                    status === "rightSelected" || status === "wrongSelected" || currentBlackHebrewId === id
                                        ? 'white'
                                        : 'black',
                            }}
                        >
                            {name}
                        </Card>
                    </Col>
                    <Col span={10}>
                    <Card
                            onClick={() => handleGermanClick(shuffledGerman[index][1])}
                            hoverable
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid hsl(240, 5%, 64.9%)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease, background-color 0.3s ease',
                                height: '50px',
                                backgroundColor:
                                    shuffledGerman[index][2] === "rightSelected"
                                        ? 'hsl(142.1, 70.6%, 45.3%)' // green
                                        : shuffledGerman[index][2] === "wrongSelected"
                                        ? 'hsl(0, 70%, 50%)' // red
                                        : currentBlackGermanId === shuffledGerman[index][1]
                                        ? 'black'
                                        : 'white',
                                color:
                                    shuffledGerman[index][2] === "rightSelected" || shuffledGerman[index][2] === "wrongSelected" || currentBlackGermanId === shuffledGerman[index][1]
                                        ? 'white'
                                        : 'black', 
                            }}
                        >
                            {shuffledGerman[index][0]}
                        </Card>
                    </Col>
                </React.Fragment>
            ))}
        </Row>
    );
};

export default LessonOneFront;
