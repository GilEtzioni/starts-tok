// react + antd
import React, { useEffect, useState } from 'react';
import { Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setRightAnswer, resetClicks, setSuccess } from "../slices/LessonsSlice";
import { RootState } from "../../../app/store";

// components + utils
import {useHandleInput} from "../utils/ThirdEffects";
import HebrewSentenceThird from './HebrewSentenceThird';
import { getForeignSentence, getForeignWord, getHebrewSentence, splitTheSentence } from '../utils/ThirdHelper';
import { splitSentenceToWords } from '../utils/SecondHelper';
import { TranslatedArray } from '../types/SecondLessonType';

// fetch
import { fetchAllWords, fetchThirdLessonWords } from '../../../api/lessons';
import { ALL_WORDS, THIRD_LESSON_SENTENCES_QUERY_KEY } from '../requests/queryKeys';
import { useQuery } from '@tanstack/react-query';

const MainThird: React.FC = () => {

  const { name, lesson } = useParams<{ name: string; lesson: string }>();

  const order = useSelector((state: RootState) => state.lessons.order);
  const clicks = useSelector((state: RootState) => state.lessons.clicks);
  const dispatch = useDispatch();

  const [hebrewSentence, setHebrewSentence] = useState<string>("");
  const [foreignWord, setForeignWord] = useState<string>("");
  const [firstPartForeign, setFirstPartForeign] = useState<string>("");
  const [secondPartForeign, setSecondPartForeign] = useState<string>("");
  const [translatedWords, setTranslatedWords] = useState<TranslatedArray[]>([]);

  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => { setInputValue(e.target.value) };
    
  const { data: lessonsData, isLoading: isCardsLoading, isError: isCardsError } = useQuery(
    [THIRD_LESSON_SENTENCES_QUERY_KEY, name, lesson],
    () => fetchThirdLessonWords(name || '', lesson || ''),
    {
      onSuccess: (lessonsData) => { 
  
        const foreignSentence = getForeignSentence(lessonsData, order);
        const hebrewSentence = getHebrewSentence(lessonsData, order);
        const foreignWord = getForeignWord(lessonsData, order);
        
        setHebrewSentence(hebrewSentence);
        setForeignWord(foreignWord);
  
        const { firstPart, secondPart } = splitTheSentence(foreignSentence, foreignWord);
        setFirstPartForeign(firstPart);
        setSecondPartForeign(secondPart);
        dispatch(setRightAnswer(foreignWord));
      },
    }
  );

  const { data: allWords, isLoading: isWordsLoading, isError: isWordsError } = useQuery(
    [ALL_WORDS, name, lesson],
    () => fetchAllWords(),
    {
      enabled: !!lessonsData,
      onSuccess: (allWords) => {
        if (!allWords|| !lessonsData) return;

        const hebrewSentence = getHebrewSentence(lessonsData, order);

        const punctuation = [',', '.', '-', '?', '...', '!'];
        const wordsArray = splitSentenceToWords(hebrewSentence, allWords);
        if (!wordsArray) return;
          
        const copiedArray = [...wordsArray];
        const firstItem = copiedArray.shift();
        const lastItemIndex = copiedArray.length - 1;
          
        if (firstItem && punctuation.includes(firstItem.hebrewString) && lastItemIndex >= 0) {
            copiedArray[lastItemIndex].hebrewString = firstItem.hebrewString + copiedArray[lastItemIndex].hebrewString;
        } 
        else if (firstItem) {
          copiedArray.unshift(firstItem);
        }
          
        setTranslatedWords(copiedArray);
      }
    }
  );

  useHandleInput({ lessonsData, order, dispatch, resetClicks, setSuccess, foreignWord, clicks, inputValue });
  const { Title } = Typography;
  
  return (
    <div className="text-center h-[400px]">

    <Row className="flex justify-center">
      <Title level={3} className="text-center !font-hebrew">תרגמו את המשפט</Title>
    </Row>
             
    <HebrewSentenceThird translatedWords={translatedWords} />
      
      {/* foreign */}
        <p className="inline-block relative top-[100px] !font-hebrew">
          {firstPartForeign}
          <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border-0 border-b-2 border-black outline-none text-[16px] text-center mx-2 placeholder-transparent focus:border-black focus:ring-0"
              style={{ width: `${foreignWord.length * 10}px` }}
              placeholder=" "
            />
          {secondPartForeign}
        </p>
      </div> 
    );
  }

export default MainThird;