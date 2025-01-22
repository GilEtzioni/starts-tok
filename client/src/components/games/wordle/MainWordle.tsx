// react + antd
import React, { useState } from 'react';
import { Row, Typography } from 'antd';

// fetch data + types
import { wordleType } from './ types/WordelType';

// components
import BackButton from '../../../common/BackButton';
import LettersGrid from './components/WordleConatiner/LettersGrid';
import AnswerGrid from './components/WordleConatiner/AnswerGrid';
import LoadingComponents from './components/WordleConatiner/LoadingComponents';

// messages
import FailureMesssage from './components/Messages/FailureMesssage';
import SuccessMessage from './components/Messages/SuccessMessage';
import NotWordMessage from './components/Messages/NotWordMessage';
import TooShortMessage from './components/Messages/TooShortMessage';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { CurrentMode } from './ types/WordelType';
import { DICTIONARY_ALL_WORDS, KEYBOARD_LETTERS } from '../requests/queryKeys';
import { fetchKeyboard, fetchWords } from '../../../api/games';
import { useQuery } from '@tanstack/react-query';
import { createLettersGrid, getRandomWord, randomWordsArray } from './utilts/wordleHelper';
import { resetClicks, resetSuccess, setCurrentMode } from './slices/WordleSlice';

const MainWordle: React.FC = () => {

    const { Title } = Typography;
    const currentMode = useSelector((state: RootState) => state.wordel.currentMode);
    const succesCounter = useSelector((state: RootState) => state.wordel.successCounter);

    const [correctAnswer, setCorrectAnswer] = useState<wordleType[]>([]);
    const [gridAnswer, setGridAnswer] = useState<wordleType[][]>([]);
    const [gridLetters, setGridLetters] = useState<wordleType[]>([]);
    const dispatch = useDispatch();

    const { data: keyboard } = useQuery(
      [KEYBOARD_LETTERS],() => fetchKeyboard())

    const {  data: words, isLoading } = useQuery(
      [DICTIONARY_ALL_WORDS],
      () => fetchWords(),
    {
      enabled: !!keyboard,
      onSuccess: (words) => {
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

  const onBackClick = () => {
    dispatch(setCurrentMode(CurrentMode.Running));
    dispatch(resetSuccess());
    dispatch(resetClicks());
  }

  if (isLoading) return (<LoadingComponents />)

  const Message = () => {
    switch (currentMode) {
      case CurrentMode.Running:
        return null;
      case CurrentMode.Failure:
        return <FailureMesssage words={words}/>;
      case CurrentMode.Success:
        return <SuccessMessage words={words}/>;
      case CurrentMode.NotInDictionary:
        return <NotWordMessage />;
      case CurrentMode.NotEnoughLetters:
        return <TooShortMessage />;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex items-center mt-5">
        <div className="absolute inset-0 flex justify-center">
          <Title level={3} className="text-center">
            הצלחת {succesCounter} משחקים ברצף
          </Title>
        </div>

        <div className="ml-auto mr-5">
          <BackButton onBack={onBackClick}/>
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
    </div>
  );
};
  
export default MainWordle;
