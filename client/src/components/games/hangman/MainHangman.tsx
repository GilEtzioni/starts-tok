// react + antd
import React, { useState } from 'react';
import { Col, Row, Typography } from 'antd';

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
import { useQuery } from '@tanstack/react-query';
import { DICTIONARY_ALL_WORDS, KEYBOARD_LETTERS } from '../requests/queryKeys';
import { fetchWords, fetchKeyboard } from '../../../api/games';
import { createGameArray, createLettersArray, getRandomWord } from './utils/hangHelper';
import { resetSuccesssCounter, resetWrongCounter, setSelectedWord } from './slices/HangmanSlice';
import { HANGMAN_FINISHED_NUMBER } from '../common/consts';
import LoadingPage from '../../../common/LoadingPage';

const MainHangman: React.FC = () => {

    const [randomWord, setRandomWord] = useState<WordsType[]>([]);
    const [lettersArray, setLettersArray] = useState<HangmanType[]>([]);
    const [gameArray, setGameArray] = useState<HangmanType[]>([]);

    const successCounter = useSelector((state: RootState) => state.hangman.successGamesCounter);
    const wrongLettersCounter = useSelector((state: RootState) => state.hangman.wrongLettersCounter);
    const dispatch = useDispatch();
    const selectedWord = useSelector((state: RootState) => state.hangman.selectedWord);

    const { data: keyboard } = useQuery(
      [KEYBOARD_LETTERS ],() => fetchKeyboard())

    const {  data: words, isLoading } = useQuery(
      [DICTIONARY_ALL_WORDS, wrongLettersCounter === HANGMAN_FINISHED_NUMBER],
      () => fetchWords(),
      {
        enabled: !!keyboard,
        onSuccess: (words) => {
          dispatch(resetWrongCounter());
          const selectedWord = getRandomWord(words);
          dispatch(setSelectedWord(selectedWord.foreignWord));
          setRandomWord([selectedWord]);

          if(!keyboard) return;
  
          const lettersRandomArray = createLettersArray(selectedWord, keyboard);
          setLettersArray(lettersRandomArray);
  
          const gameRandomArray = createGameArray(selectedWord, keyboard);
          setGameArray(gameRandomArray);
        }
      }
  );

    const handleBack = () => {
      if (words === undefined) return;
      const selectedWord = getRandomWord(words);
      dispatch(resetSuccesssCounter());
    };

    const { Title } = Typography;
    
    return (
      <>
        {isLoading ? 
        <LoadingPage />
          :
          <Row>
            <Col span={14} className="h-screen p-10 relative">
              <div className="absolute">
                <MainMessages randomWord={randomWord} lettersArray={lettersArray} words={words} selectedWord={selectedWord}/>
              </div>
    
              <div className="flex flex-col items-center justify-center gap-5 h-0 mt-10">
                <CourseName randomWord={randomWord} />
                <div className="w-full text-center">
                  <WordsLines gameArray={gameArray} />
                </div>
              </div>
    
              <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-auto">
                <WordsGrid
                  lettersArray={lettersArray}
                  setLettersArray={setLettersArray}
                  gameArray={gameArray}
                  setGameArray={setGameArray}
                />
              </div>
            </Col>
    
        <Col span={10} className="h-screen flex flex-col">
          <div className="flex justify-between items-center p-5">
            <Title level={3} className="text-xl font-semibold antialiased ml-40">
              הצלחת {successCounter} משחקים ברצף
            </Title>
            <BackButton onBack={handleBack} />
          </div>

          <div className="flex-grow flex flex-col items-center justify-center">
            <PhotosHang />
          </div>
        </Col>
          </Row>
    }
      </>
    );    
  } 
  
  export default MainHangman;