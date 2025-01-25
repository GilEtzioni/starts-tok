// react + antd
import React, { useState } from 'react';
import { Typography } from 'antd';

// components
import BackButton from '../../../common/BackButton';
import LettersGrid from './common/WordleConatiner/LettersGrid';
import AnswerGrid from './common/WordleConatiner/AnswerGrid';
import LoadingPage from '../../../common/LoadingPage';
import { wordleType } from './ types/WordelType';
import FinishedGameMesssage from '../common/FinishedGameMesssage';
import NotWordMessage from './common/Messages/NotWordMessage';
import TooShortMessage from './common/Messages/TooShortMessage';
import { useWordleActions } from "./utilts/messageHelper";

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { CurrentMode } from './ types/WordelType';
import { DICTIONARY_ALL_WORDS, KEYBOARD_LETTERS } from '../requests/queryKeys';
import { fetchKeyboard, fetchWords } from '../../../api/games';
import { useQuery } from '@tanstack/react-query';
import { createLettersGrid, getRandomWord, randomWordsArray } from './utilts/wordleHelper';
import { resetClicks, resetSuccess, setCurrentMode } from './slices/WordleSlice';
import { WORDLE_FINISHED_NUMBER } from '../common/consts';


const MainWordle: React.FC = () => {

    const { Title } = Typography;
    const currentMode = useSelector((state: RootState) => state.wordel.currentMode);
    const succesCounter = useSelector((state: RootState) => state.wordel.successCounter);
    const clicksCounter = useSelector((state: RootState) => state.wordel.clicksCounter);

    const [correctAnswer, setCorrectAnswer] = useState<wordleType[]>([]);
    const [gridAnswer, setGridAnswer] = useState<wordleType[][]>([]);
    const [gridLetters, setGridLetters] = useState<wordleType[]>([]);
    const dispatch = useDispatch();
    const { restartGameFail, handleBackFail, restartGameSuccess, handleBackSuccess } = useWordleActions();

    const { data: keyboard } = useQuery(
      [KEYBOARD_LETTERS],() => fetchKeyboard())

    const {  data: words, isLoading } = useQuery(
      [DICTIONARY_ALL_WORDS, clicksCounter === WORDLE_FINISHED_NUMBER],
      () => fetchWords(),
    {
      enabled: !!keyboard,
      onSuccess: (words) => {
        dispatch(resetClicks());
        const filterArray = randomWordsArray(words);
        const gameWord = getRandomWord(filterArray);
        if (!keyboard) return;
        const gridLetters = createLettersGrid(keyboard);
  
        const ROW_LENGTH = 5;
        const COLUMN_LENGTH = gameWord.length;
  
        const initialGrid = Array.from({ length: ROW_LENGTH }, () =>
          Array(COLUMN_LENGTH).fill(null)
        );
  
        setGridAnswer(initialGrid);
        setCorrectAnswer(gameWord);
        setGridLetters(gridLetters);
      }
      }
  );

  const Message = () => {
    switch (currentMode) {
      case CurrentMode.Running:
        return null;
      case CurrentMode.Failure:
        return <FinishedGameMesssage onBack={handleBackFail} onRestart={restartGameFail} title='המשחק נגמר'/>;
      case CurrentMode.Success:
        return <FinishedGameMesssage onBack={handleBackSuccess} onRestart={restartGameSuccess}  title='!כל הכבוד'/>
      case CurrentMode.NotInDictionary:
        return <NotWordMessage />;
      case CurrentMode.NotEnoughLetters:
        return <TooShortMessage />;
      default:
        return null;
    }
  };
  
  return (
    <>
    {isLoading ?
    <LoadingPage /> 
    : ( <div className="flex flex-col min-h-screen">
      <div className="relative flex items-center mt-5">
        <div className="absolute inset-0 flex justify-center">
          <Title level={3} className="text-center">
            הצלחת {succesCounter} משחקים ברצף
          </Title>
        </div>

        <div className="ml-auto mr-5">
          <BackButton />
        </div>
    </div>
  
      {Message()}
  
      <div className="flex-grow flex flex-col items-center justify-center">
        <AnswerGrid gridAnswer={gridAnswer} />
  
        <LettersGrid
          correctAnswer={correctAnswer}
          gridAnswer={gridAnswer}
          setGridAnswer={setGridAnswer}
          gridLetters={gridLetters}
          setGridLetters={setGridLetters}
          words={words}
        />
      </div>
    </div> )}
    </>
  );
};
  
export default MainWordle;