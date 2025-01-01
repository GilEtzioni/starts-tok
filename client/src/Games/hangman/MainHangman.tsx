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
import './MainHangman.css';
import { hangmanType } from './types/hangmanType'; 
import MainMessages from "./messages/MainMessages";
import { useStartGame } from './HangEffects';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getRandomWord } from './HangHelper';
import { useDispatch } from 'react-redux';
import { setSelectedWord } from './dataHangman/HangmanSlice';
import { getSelectedWord } from './HangHelper';

const MainHangman: React.FC = () => {

    const gameWord = useSelector((state: RootState) => state.hangman.selectedWord);
    const resetGame = useSelector((state: RootState) => state.hangman.succcessCounter);


    const fetchItems = async (): Promise<WordsType[]> => {
      const { data } = await axiosInstance.get('/hangman');
      return data;
    };
  
    const { data: words = [], isLoading, error } = useQuery(['hangman'], fetchItems);
  
    const [randomWord, setRandomWord] = useState<Array<WordsType>>([]);
    const [lettersArray, setLettersArray] = useState<Array<hangmanType>>([]);
    const [gameArray, setgameArray] = useState<Array<hangmanType>>([]);

    const dispatch = useDispatch();

    // first start game
    useEffect(() => {
      if (words.length > 0) {
          const selectedWord = getRandomWord(words);
          dispatch(setSelectedWord([selectedWord]));
      }
  }, [words, dispatch]);

    // next start games
    useStartGame({ words , gameWord, setRandomWord, setLettersArray, setgameArray});

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
  
    return (
      <Row>
        {/* Column with 60% width */}
        <Col span={14} className="main-hangman-left-column">
          {/* BackButton */}
          <div className="header-container">
            <BackButton />
            <MainMessages randomWord={randomWord} lettersArray={lettersArray} words={words}/>
          </div>
  
          {/* CourseName and WordsLines */}
          <div className="center-container">
          <CourseName randomWord={randomWord} />
            <div className="words-lines-container">
              <WordsLines lettersArray={lettersArray} gameArray={gameArray}/>
            </div>
          </div>

          {/* WordsGrid */}
          <div className="words-grid-container">
            <WordsGrid lettersArray={lettersArray} setLettersArray={setLettersArray} gameArray={gameArray} setgameArray={setgameArray}/>
          </div>
        </Col>
  
        {/* Column with 40% width */}
        <Col span={10} className="main-hangman-right-column">
          <div className="photos-container">
            <p className="success-message"> הצלחת ברצף 0 משחקים </p>
            <PhotosHang />
          </div>
        </Col>
      </Row>
    );
  };
  
  export default MainHangman;
  