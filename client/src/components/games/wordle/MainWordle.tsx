// react + antd
import React, { useEffect, useState } from 'react';
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
import { createLettersGrid, getRandomWord, randomWordsArray } from './utilts/wordleHelper';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { CurrentMode } from './ types/WordelType';
import { WORDLE_WORDS, WORDLE_LETTERS } from '../requests/queryKeys';
import { resetClicks, setCurrentMode, setClicks, resetWordle } from './slices/WordleSlice';

// fetch
import { fetchKeyboard, fetchWords } from '../../../api/games';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useWithAuth } from '../../../api/common/withAuth';
import { useAddNewScore } from '../requests/addScoreMutate'; 
import { GameNameEnum } from '../../pages/MainPage/common/GamesCards/types/mainPageTypes';
import { WORDLE_FINISHED_NUMBER } from '../common/consts';

const MainWordle: React.FC = () => {

    const queryClient = useQueryClient();
    const newScore = useAddNewScore(GameNameEnum.Wordle);

    const { Title } = Typography;
    const { currentMode, successCounter} = useSelector((state: RootState) => state.wordel);

    const [correctAnswer, setCorrectAnswer] = useState<wordleType[]>([]);
    const [gridAnswer, setGridAnswer] = useState<wordleType[][]>([]);
    const [gridLetters, setGridLetters] = useState<wordleType[]>([]);
    const dispatch = useDispatch();

    const withAuth = useWithAuth();
    const fetchGameWords = () => withAuth((token) => fetchWords(token));
    const fetchGameKeyboard = () => withAuth((token) => fetchKeyboard(token));

    const { data: keyboard } = useQuery(
      [ WORDLE_LETTERS ],
      fetchGameKeyboard, {
        staleTime: Infinity, 
        cacheTime: Infinity,
        refetchOnMount: true,
      })

    const {  data: words, isLoading } = useQuery(
      [ WORDLE_WORDS ],
      fetchGameWords,
    {
      staleTime: Infinity, 
      cacheTime: Infinity,
      refetchOnMount: true,
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

    useEffect(() => {
      queryClient.invalidateQueries([WORDLE_WORDS]);
      queryClient.invalidateQueries([WORDLE_LETTERS]);
  }, [queryClient]); 

  const payload = { score: successCounter };

  const handleBack = async () => {
    dispatch(resetWordle())
    await queryClient.removeQueries(); 
  };

  const restartGameFail = async () => {
    await newScore.mutate(payload);
    dispatch(setCurrentMode(CurrentMode.Loading), setClicks(WORDLE_FINISHED_NUMBER));
    await queryClient.removeQueries(); 
  };

  const restartGameSuccess = async () => {
    await newScore.mutate(payload);
    dispatch(setCurrentMode(CurrentMode.Loading), setClicks(WORDLE_FINISHED_NUMBER));
    await queryClient.removeQueries(); 
  };

  const Message = () => {
    switch (currentMode) {
      case CurrentMode.Running:
        return null;
      case CurrentMode.Failure:
        newScore.mutate(payload);
        return <FinishedGameMesssage onBack={handleBack} onRestart={restartGameFail} title='המשחק נגמר'/>;
      case CurrentMode.Success:
        newScore.mutate(payload);
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