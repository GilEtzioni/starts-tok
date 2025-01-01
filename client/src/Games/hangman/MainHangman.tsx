// react + antd
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

// fetch 
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './dataHangman/axiosInstance';
import { WordsType } from "../../Dictionarys/types/wordType";

// components
import BackButton from "../../components/Main/BackButton";
import CourseName from './components/CourseName';
import WordsLines from './components/WordsLines';
import WordsGrid from './components/WordsGrid';
import PhotosHang from './components/PhotosHang';
import { hangmanType } from './types/hangmanType'; 
import MainMessages from "./messages/MainMessages";
import { useStartGame } from './HangEffects';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getRandomWord } from './HangHelper';
import { useDispatch } from 'react-redux';
import { setSelectedWord } from './dataHangman/HangmanSlice';

const MainHangman: React.FC = () => {


    const fetchItems = async (): Promise<WordsType[]> => {
      const { data } = await axiosInstance.get('/hangman');
      return data;
    };
  
    const { data: words = [], isLoading, error } = useQuery(['hangman'], fetchItems);
  
    const [randomWord, setRandomWord] = useState<Array<WordsType>>([]);
    const [lettersArray, setLettersArray] = useState<Array<hangmanType>>([]);
    const [gameArray, setgameArray] = useState<Array<hangmanType>>([]);

    const gameWord = useSelector((state: RootState) => state.hangman.selectedWord);
    const dispatch = useDispatch();

    // the word of the firat game
    useEffect(() => {
      if (words.length > 0) {
          const selectedWord = getRandomWord(words);
          dispatch(setSelectedWord([selectedWord]));
      }
  }, [words, dispatch]);

    useStartGame({ words , gameWord, setRandomWord, setLettersArray, setgameArray});

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
  
    return (
    <Row>
      <Col span={14} className="bg-[#f0f0f0] h-screen p-2 relative">
        <div className="flex justify-start mb-5">
          <BackButton/>
          <MainMessages randomWord={randomWord} lettersArray={lettersArray} words={words} />
        </div>

        <div className="flex flex-col items-center justify-center gap-5 h-0">
          <CourseName randomWord={randomWord} />
          <div className="w-full text-center">
            <WordsLines lettersArray={lettersArray} gameArray={gameArray} />
          </div>
        </div>

        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-auto">
          <WordsGrid lettersArray={lettersArray} setLettersArray={setLettersArray} gameArray={gameArray} setgameArray={setgameArray} />
        </div>
      </Col>

      <Col span={10} className="bg-[#d3d3d3] h-screen">
        <div className="flex flex-col items-center mt-12">
          <p className="mb-5 text-lg"> הצלחת ברצף 0 משחקים </p>
          <PhotosHang />
        </div>
      </Col>
    </Row>
    );
  };
  
  export default MainHangman;
  