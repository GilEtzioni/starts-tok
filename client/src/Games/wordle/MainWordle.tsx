// react + antd
import React, { useState } from 'react';
import { Row, Typography } from 'antd';

// fetch data + types
import { useFetchWordsData } from './api/axiosInstance';
import { WordsType } from '../hangman/types/types'; 
import { wordleType, letterColor } from './ types/WordelType';

// components
import BackButton from './components/BackButton';
import LettersGrid from './components/LettersGrid';
import AnswerGrid from './components/AnswerGrid';
import LoadingComponents from './components/LoadingComponents';

// messages
import FailureMesssage from './Messages/FailureMesssage';
import SuccessMessage from './Messages/SuccessMessage';
import NotWordMessage from './Messages/NotWordMessage';
import TooShortMessage from './Messages/TooShortMessage';

// redux
import { useStartGame } from './utilts/WordelEffects';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const MainWordle: React.FC = () => {

    const { data: words, isLoading, error } = useFetchWordsData();

    const { Title } = Typography;
    const currentMode = useSelector((state: RootState) => state.wordel.currentMode);

    const [correctAnswer, setCorrectAnswer] = useState<wordleType[]>([]);
    const [gridAnswer, setGridAnswer] = useState<wordleType[][]>([]);
    const [gridLetters, setGridLetters] = useState<{ letter: string; letterColor: letterColor }[]>([]);
    const [allWords, setAllWords] = useState<WordsType[]>([]);

  useStartGame({ words, setAllWords, setGridAnswer, setCorrectAnswer, setGridLetters });


  if (isLoading) return (<LoadingComponents />)
  if (error) return <div>Error:</div>;

  const Message = () => {
    switch (currentMode) {
      case 'running':
        return null;
      case 'failure':
        return <FailureMesssage />;
      case 'success':
        return <SuccessMessage />;
      case 'notInDictionary':
        return <NotWordMessage />;
      case 'notEnoughLetters':
        return <TooShortMessage />;
      default:
        return null;
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
            <Title level={3} className="text-center">
              {' '}
              הצלחת 0 משחקים ברצף{' '}
            </Title>
          </Row>
        </div>
      </div>

      {Message()}

      <div className="flex-grow flex flex-col items-center justify-center">
        <AnswerGrid
          gridAnswer={gridAnswer}
          setGridAnswer={setGridAnswer}
          correctAnswer={correctAnswer}
          allWords={allWords}
        />
        <LettersGrid
          correctAnswer={correctAnswer}
          gridAnswer={gridAnswer}
          setGridAnswer={setGridAnswer}
          gridLetters={gridLetters}
          setGridLetters={setGridLetters}
          allWords={allWords}
        />
      </div>
    </div>
  );
};

export default MainWordle;
