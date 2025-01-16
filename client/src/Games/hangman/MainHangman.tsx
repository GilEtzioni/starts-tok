// react + antd
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

//redux
import { useDispatch } from 'react-redux';
import { setSelectedWord} from './slices/HangmanSlice';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

// components
import BackButton from './components/HangmanContainer/BackButton';
import CourseName from './components/HangmanContainer/CourseName';
import WordsLines from './components/HangmanContainer/WordsLines';
import WordsGrid from './components/HangmanContainer/WordsGrid';
import PhotosHang from './components/HangmanContainer/PhotosHang';
import MainMessages from './components/Messages/MainMessages';

// functions + types
import { HangmanType } from './types/hangmanType'; 
import { WordsType } from "../../types/types";
import { useStartGame } from './utils/HangEffects';
import { getRandomWord } from './utils/HangHelper';
import { useFetchWordsData } from '../api/fetchingGame';

const MainHangman: React.FC = () => {

  const { data: words, isLoading, error } = useFetchWordsData();
  
    const [randomWord, setRandomWord] = useState<WordsType[]>([]);
    const [lettersArray, setLettersArray] = useState<HangmanType[]>([]);
    const [gameArray, setGameArray] = useState<HangmanType[]>([]);

    const successCounter = useSelector((state: RootState) => state.hangman.successCounter);
    const gameWord = useSelector((state: RootState) => state.hangman.selectedWord);
    const dispatch = useDispatch();

    // the word of the firat game
    useEffect(() => {
      if (words !== undefined) {
          const selectedWord = getRandomWord(words);
          dispatch(setSelectedWord([selectedWord]));
      }
  }, [words, dispatch]);

    useStartGame({ words , gameWord, setRandomWord, setLettersArray, setGameArray});

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
            <WordsLines gameArray={gameArray} />
          </div>
        </div>

        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-auto">
          <WordsGrid lettersArray={lettersArray} setLettersArray={setLettersArray} gameArray={gameArray} setGameArray={setGameArray} />
        </div>
      </Col>

      <Col span={10} className="bg-[#f0f0f0] h-screen">
        <div className="flex flex-col items-center mt-12">
          <p className="mb-5 text-lg !font-hebrew"> הצלחת {successCounter} משחקים ברצף </p>
          <PhotosHang />
        </div>
      </Col>
    </Row>
    );
  };
  
  export default MainHangman;
  