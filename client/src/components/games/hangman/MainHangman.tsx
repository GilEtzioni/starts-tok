// react + antd
import React, { useState } from 'react';
import { Col, Row, Typography } from 'antd';

//redux
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

// components
import BackButton from './components/HangmanContainer/BackButton';
import CourseName from './components/HangmanContainer/CourseName';
import WordsLines from './components/HangmanContainer/WordsLines';
import WordsGrid from './components/HangmanContainer/WordsGrid';
import PhotosHang from './components/HangmanContainer/PhotosHang';
import MainMessages from './components/Messages/MainMessages';

// functions + types
import { HangmanType } from './types/hangmanType'; 
import { WordsType } from "../../../api/common/types";
import { useQuery } from '@tanstack/react-query';
import { Dictionary_ALL_WORDS } from '../requests/queryKeys';
import { fetchWords } from '../../../api/games';
import { createGameArray, createLettersArray, getRandomWord } from './utils/HangHelper';
import { setSelectedWord } from './slices/HangmanSlice';

const MainHangman: React.FC = () => {

    const [randomWord, setRandomWord] = useState<WordsType[]>([]);
    const [lettersArray, setLettersArray] = useState<HangmanType[]>([]);
    const [gameArray, setGameArray] = useState<HangmanType[]>([]);

    const successCounter = useSelector((state: RootState) => state.hangman.successGamesCounter);
    const dispatch = useDispatch();

    const {  data: words, isLoading, error } = useQuery(
      [Dictionary_ALL_WORDS],
      () => fetchWords(),
      {
        onSuccess: (words) => {
          setLettersArray([]);
          setGameArray([]);
  
          const selectedWord = getRandomWord(words);
          dispatch(setSelectedWord([selectedWord]));
  
          setRandomWord([selectedWord]);
  
          const lettersRandomArray = createLettersArray(selectedWord);
          setLettersArray(lettersRandomArray);
  
          const gameRandomArray = createGameArray(selectedWord);
          setGameArray(gameRandomArray);
        }
      }
  );

    const { Title } = Typography;

    if (isLoading) return <div>Loading...</div>;
  
  return (
      <>
      {words? (
    <Row>
      <Col span={14} className="h-screen p-2 relative">
        <div className="flex justify-start mb-5">
          <BackButton words={words}/>
        </div>

        <div className="absolute">
            <MainMessages randomWord={randomWord} lettersArray={lettersArray} words={words} />
        </div>

        <div className="flex flex-col items-center justify-center gap-5 h-0">
          <CourseName randomWord={randomWord} />
          <div className="w-full text-center">
            <WordsLines gameArray={gameArray} />
          </div>
        </div>

        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-auto">
          <WordsGrid lettersArray={lettersArray} setLettersArray={setLettersArray} gameArray={gameArray} setGameArray={setGameArray} />
        </div>
      </Col>

      <Col span={10} className="h-screen">
        <div className="flex flex-col items-center mt-12">
          <Title
            level={3}
            className="mb-5 text-3xl font-semibold text-center antialiased !font-hebrew" >
              הצלחת {successCounter} משחקים ברצף 
          </Title>
          <PhotosHang />
        </div>
      </Col>

    </Row>
      ) : null}
    </>
    );
  }
  
  export default MainHangman;
  