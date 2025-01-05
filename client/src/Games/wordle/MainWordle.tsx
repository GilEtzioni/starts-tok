// react + antd
import React, { useEffect, useState } from 'react';
import { Spin, Row, Typography } from 'antd';

// fetch data
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './dataWordle/axiosInstance';
import { WordsType } from '../hangman/types/types';
import { wordleType, letterColor } from './ types/WordelType';

// components
import BackButton from './components/BackButton';
import LettersGrid from './components/LettersGrid';
import AnswerGrid from './components/AnswerGrid';

// messages
import FailureMesssage from './Messages/FailureMesssage';
import SuccessMessage from './Messages/SuccessMessage';
import NotWordMessage from './Messages/NotWordMessage';
import TooShortMessage from './Messages/TooShortMessage';

// helping functions
import { useStartGame } from './WordelEffects';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const MainWordle: React.FC = () => {
    
    const fetchItems = async (): Promise<WordsType[]> => {
        const { data } = await axiosInstance.get('/wordle');
        return data;
    };

    const { data: words = [], isLoading, error } = useQuery(['wordle'], fetchItems);

    const [correctAnswer, setCorrectAnswer] = useState <Array<wordleType>>([]);
    const [gridAnswer, setGridAnswer] = useState<Array<Array<wordleType>>>([]);
    const [gridLetters, setGridLetters] = useState<Array<{ letter: string; letterColor: letterColor }>>([]);
    const [allWords, setAllWords] = useState <Array<WordsType>>([]);

    useStartGame({ words, setAllWords, setGridAnswer, setCorrectAnswer, setGridLetters });

    const currentMode = useSelector((state: RootState) => state.wordel.currentMode);
    const clicksCounter = useSelector((state: RootState) => state.wordel.clicksCounter);

    useEffect(() => {
        console.log("clicks: ", clicksCounter)
    }, [clicksCounter]);

    const { Title } = Typography;

    if (isLoading) return <Spin tip="Loading..." />;
    if (error) return <div>Error loading data</div>;

    const res = correctAnswer.map((item) => item?.letter).join('');
    console.log("res: ", res); 

    const Message = () => {
        switch (currentMode) {
            case "running":
                return null; // No message for "running"
            case "failure":
                return <FailureMesssage />;
            case "success":
                return <SuccessMessage />;
            case "notInDictionary":
                return <NotWordMessage />;
            case "notEnoughLetters":
                return <TooShortMessage />;
            default:
                return null; // Fallback if `currentMode` doesn't match any case
        }
    };


    return (
        <div className="flex flex-col min-h-screen"> 

            <div className="flex items-center justify-between mb-5">
                <div className="absolute left-5">
                    <BackButton />
                </div>
    
                <div className="w-full">
                    <Row justify="center" className="mt-8">
                        <Title level={3} className="text-center"> הצלחת 0 משחקים ברצף </Title>
                    </Row>
                </div>
            </div>

            {Message()}

            <div className="flex-grow flex flex-col items-center justify-center">
                <AnswerGrid gridAnswer={gridAnswer} setGridAnswer={setGridAnswer} words={words} correctAnswer={correctAnswer}/>
                <LettersGrid correctAnswer={correctAnswer}  gridAnswer={gridAnswer} setGridAnswer={setGridAnswer} gridLetters={gridLetters} setGridLetters={setGridLetters} allWords={allWords}/>
            </div>
        </div>
    );
}

export default MainWordle;