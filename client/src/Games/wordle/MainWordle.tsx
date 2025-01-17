// react + antd
import React, { useState } from 'react';
import { Row, Typography } from 'antd';

// fetch data + types
import { wordleType } from './ types/WordelType';

// components
import BackButton from './components/WordleConatiner/BackButton';
import LettersGrid from './components/WordleConatiner/LettersGrid';
import AnswerGrid from './components/WordleConatiner/AnswerGrid';
import LoadingComponents from './components/WordleConatiner/LoadingComponents';

// messages
import FailureMesssage from './components/Messages/FailureMesssage';
import SuccessMessage from './components/Messages/SuccessMessage';
import NotWordMessage from './components/Messages/NotWordMessage';
import TooShortMessage from './components/Messages/TooShortMessage';

// redux
import { useStartGame } from './utilts/WordelEffects';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useFetchWordsData } from '../api/fetchingGame';
import { CurrentMode } from './ types/WordelType';

const MainWordle: React.FC = () => {

    const { data: words, isLoading, error } = useFetchWordsData();

    const { Title } = Typography;
    const currentMode = useSelector((state: RootState) => state.wordel.currentMode);
    const succesCounter = useSelector((state: RootState) => state.wordel.successCounter);

    const [correctAnswer, setCorrectAnswer] = useState<wordleType[]>([]);
    const [gridAnswer, setGridAnswer] = useState<wordleType[][]>([]);
    const [gridLetters, setGridLetters] = useState<wordleType[]>([]);

  useStartGame({ words, setGridAnswer, setCorrectAnswer, setGridLetters });

  if (isLoading) return (<LoadingComponents />)
  if (error) return <div>Error:</div>;

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
      <div className="flex items-center justify-between mb-5">
        <div className="absolute left-5">
          <BackButton />
        </div>

        <div className="w-full">
          <Row justify="center" className="mt-8">
            <Title level={3} className="text-center !font-hebrew">
              הצלחת {succesCounter} משחקים ברצף
            </Title>
          </Row>
        </div>
      </div>

      {Message()}

      <div className="flex-grow flex flex-col items-center justify-center">
        <AnswerGrid
          gridAnswer={gridAnswer}
        />

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
