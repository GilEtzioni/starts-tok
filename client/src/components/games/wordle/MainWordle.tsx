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
import { useWithAuth } from '../../../api/common/withAuth';


const MainWordle: React.FC = () => {

    const { Title } = Typography;
    const { currentMode, successCounter, clicksCounter} = useSelector((state: RootState) => state.wordel);

    const [correctAnswer, setCorrectAnswer] = useState<wordleType[]>([]);
    const [gridAnswer, setGridAnswer] = useState<wordleType[][]>([]);
    const [gridLetters, setGridLetters] = useState<wordleType[]>([]);
    const dispatch = useDispatch();
    const { restartGameFail, handleBack, restartGameSuccess } = useWordleActions();

    const withAuth = useWithAuth();
    const fetchGameWords = () => withAuth((token) => fetchWords(token));
    const fetchGameKeyboard = () => withAuth((token) => fetchKeyboard(token));

    const { data: keyboard } = useQuery(
      [KEYBOARD_LETTERS, currentMode === CurrentMode.Loading],
      fetchGameKeyboard, {
        staleTime: Infinity, 
        cacheTime: Infinity,
      })

    const {  data: words, isLoading } = useQuery(
      [DICTIONARY_ALL_WORDS, currentMode === CurrentMode.Loading],
      fetchGameWords,
    {
      staleTime: Infinity, 
      cacheTime: Infinity,
      enabled: !!keyboard,
      onSuccess: (words) => {
        if (!words) return;
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
        dispatch(setCurrentMode(CurrentMode.Running));
      }
      }
  );

  const Message = () => {
    switch (currentMode) {
      case CurrentMode.Running:
        return null;
      case CurrentMode.Failure:
        return <FinishedGameMesssage onBack={handleBack} onRestart={restartGameFail} title='המשחק נגמר'/>;
      case CurrentMode.Success:
        return <FinishedGameMesssage onBack={handleBack} onRestart={restartGameSuccess}  title='!כל הכבוד'/>
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
    {isLoading || currentMode === CurrentMode.Loading ?
    <LoadingPage /> 
    : ( <div className="flex flex-col min-h-screen">
      <div className="relative flex items-center mt-5">
        <div className="absolute inset-0 flex justify-center">
          <Title level={3} className="text-center">
            הצלחת {successCounter} משחקים ברצף
          </Title>
        </div>

        <div className="ml-auto mr-5">
          <BackButton onBack={handleBack}/>
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