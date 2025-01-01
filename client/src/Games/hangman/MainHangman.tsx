// react + antd
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';

// fetch 
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "./dataHangman/axiosInstance";
import { WordsType } from "../../Dictionarys/types/wordType";

// components
import BackButton from "../../components/Main/BackButton";
import CourseName from './components/CourseName';
import WordsLines from './components/WordsLines';
import WordsGrid from './components/WordsGrid';
import PhotosHang from './components/PhotosHang';
import { getRandomWord, createArray } from "./HangHelper";
import './MainHangman.css';

const MainHangman: React.FC = () => {
    const fetchItems = async (): Promise<WordsType[]> => {
      const { data } = await axiosInstance.get('/hangman');
      return data;
    };
  
    const { data: words = [], isLoading, error } = useQuery(['hangman'], fetchItems);
  
    const [radomWord, setRandomWord] = useState<Array<WordsType>>([]);
    const [lettersArray, setLettersArray] = useState<Array<[string, boolean]>>([]);
    
    useEffect(() => {
      if (words.length > 0) {
        // get a random word
        const selectedWord = getRandomWord(words);
        setRandomWord([selectedWord]); // Wrap it in an array
    
        // create array of letters
        const lettersRandomArray = createArray(selectedWord);
        console.log("lettersRandomArray: ", lettersRandomArray);
        setLettersArray(lettersRandomArray);
      }
    }, [words]);
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

  
    return (
      <Row>
        {/* Column with 60% width */}
        <Col span={14} className="main-hangman-left-column">
          {/* BackButton */}
          <div className="header-container">
            <BackButton />
          </div>
  
          {/* CourseName and WordsLines */}
          <div className="center-container">
          <CourseName randomWord={radomWord} />
            <div className="words-lines-container">
              <WordsLines lettersArray={lettersArray} />
            </div>
          </div>
  
          {/* WordsGrid */}
          <div className="words-grid-container">
            <WordsGrid lettersArray={lettersArray} setLettersArray={setLettersArray}/>
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
  