// react + antd
import React, { useEffect, useState } from 'react';
import { Col, Grid, Row, Typography } from 'antd';

//redux
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

// components
import BackButton from '../../../common/BackButton';
import CourseName from './common/CourseName';
import WordsLines from './common/WordsLines';
import WordsGrid from './common/WordsGrid';
import PhotosHang from './common/PhotosHang';
import MainMessages from './common/MainMessages';

// functions + types
import { HangmanType } from './types/hangmanType'; 
import { WordsType } from "../../../api/common/types";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HANGMAN_WORDS, HANGMAN_LETTERS } from '../requests/queryKeys';
import { fetchWords, fetchKeyboard } from '../../../api/games';
import { createGameArray, createLettersArray, getRandomWord } from './utils/hangHelp';
import { resetHangman, resetWrongCounter, setSelectedWord } from './slices/HangmanSlice';
import { HANGMAN_FINISHED_NUMBER } from '../common/consts';
import LoadingPage from '../../../common/LoadingPage';
import { useWithAuth } from '../../../api/common/withAuth';
import classNames from 'classnames';

const MainHangman: React.FC = () => {

    const queryClient = useQueryClient();

    const [randomWord, setRandomWord] = useState<WordsType[]>([]);
    const [lettersArray, setLettersArray] = useState<HangmanType[]>([]);
    const [gameArray, setGameArray] = useState<HangmanType[]>([]);

    const { successGamesCounter, wrongLettersCounter, selectedWord} = useSelector((state: RootState) => state.hangman);
    const dispatch = useDispatch();

    const withAuth = useWithAuth();
    const fetchGameWords = () => withAuth((token) => fetchWords(token));
    const fetchGameKeyboard = () => withAuth((token) => fetchKeyboard(token));

    const { data: keyboard } = useQuery(
      [ HANGMAN_LETTERS ],
      fetchGameKeyboard, {
        staleTime: Infinity, 
        cacheTime: Infinity,
        refetchOnMount: true,
      })

    const {  data: words, isLoading } = useQuery(
      [ HANGMAN_WORDS ],
      fetchGameWords,
      {
        staleTime: Infinity, 
        cacheTime: Infinity,
        enabled: !!keyboard,
        onSuccess: (words) => {
          if (!words) return;
          const selectedWord = getRandomWord(words);
          dispatch(setSelectedWord(selectedWord.foreignWord));
          setRandomWord([selectedWord]);

          if(!keyboard) return;

          const lettersRandomArray = createLettersArray(selectedWord, keyboard);
          setLettersArray(lettersRandomArray);
          const gameRandomArray = createGameArray(selectedWord, keyboard);
          setGameArray(gameRandomArray);
          dispatch(resetWrongCounter());
        }
      }
  );

    const handleBack = async () => {
      dispatch(resetHangman())
      await queryClient.removeQueries(); 
    };
  

    useEffect(() => {
      queryClient.invalidateQueries([HANGMAN_LETTERS]);
      queryClient.invalidateQueries([HANGMAN_WORDS]);
  }, [queryClient]); 

  const { Title } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <>
      {isLoading || wrongLettersCounter === HANGMAN_FINISHED_NUMBER ? (
        <LoadingPage />
      ) : (
        <Row className={isMobile ? "flex flex-col" : "flex"}>
          <Col
            span={isMobile ? 24 : 14}
            className={isMobile ? "min-h-screen p-10 relative flex flex-col" : "h-screen p-10 relative"}
          >
            <div className={isMobile ? "absolute top-2 right-5" : "fixed top-5 right-5 z-50"}>
              <BackButton onBack={handleBack} />
            </div>

            <div className={isMobile ? "absolute top-2 left-1/2 transform -translate-x-1/2 text-center" : "fixed top-5 right-52 z-50"}>
              <Title 
                level={isMobile ? 4 : 3} 
                className="text-xl font-semibold antialiased whitespace-nowrap"
              >
                הצלחת {successGamesCounter} משחקים ברצף
              </Title>
            </div>


            <div className="absolute">
              <MainMessages randomWord={randomWord} lettersArray={lettersArray} words={words} selectedWord={selectedWord} />
            </div>

            <div className={classNames( 
              "flex flex-col items-center justify-center gap-5",
              isMobile ? "mt-10" : "-mt-5 z-50"
            )}>
              <CourseName randomWord={randomWord} />
              <div className="w-[140px] text-center mx-auto flex flex-col items-center justify-center">
                <WordsLines gameArray={gameArray} />
                {isMobile && <PhotosHang />}
              </div>
            </div>



            <div className={isMobile ? "w-full mt-5" : "absolute top-[50%] left-1/2 -translate-x-1/2 w-auto"}>
              <WordsGrid
                lettersArray={lettersArray}
                setLettersArray={setLettersArray}
                gameArray={gameArray}
                setGameArray={setGameArray}
              />
            </div>
          </Col>

          {!isMobile && (
            <Col span={10} className="h-[screen] flex flex-col">
              <div className="flex-grow flex flex-col items-center justify-center">
                <PhotosHang />
              </div>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default MainHangman;