// react + antd
import React, { useState } from 'react';
import { Row, Typography, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setRightAnswer, resetClicks, setSuccess } from "../slices/LessonsSlice";
import { RootState } from "../../../app/store";

// components + utils
import {useHandleInput} from "../utils/ThirdEffects";
import HebrewSentenceThird from './HebrewSentenceThird';
import { splitTheSentence } from '../utils/ThirdHelper';
import { splitSentenceToWords } from '../utils/SecondHelper';
import { TranslatedArray } from '../types/SecondLessonType';

// fetch
import { fetchAllWords, fetchThirdLesson } from '../../../api/lessons';
import { ALL_WORDS, THIRD_LESSON_QUERY_KEY } from '../requests/queryKeys';
import { useQuery } from '@tanstack/react-query';

const MainThird: React.FC = () => {

  const { name, lesson } = useParams<{ name: string; lesson: string }>();

  const order = useSelector((state: RootState) => state.lessons.order);
  const clicks = useSelector((state: RootState) => state.lessons.clicks);
  const dispatch = useDispatch();

  const [foreignWord, setForeignWord] = useState<string>("");
  const [firstPartForeign, setFirstPartForeign] = useState<string>("");
  const [secondPartForeign, setSecondPartForeign] = useState<string>("");
  const [translatedWords, setTranslatedWords] = useState<TranslatedArray[]>([]);

  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => { setInputValue(e.target.value) };
    
  const { data: lessonsData, isLoading: isCardsLoading } = useQuery(
    [THIRD_LESSON_QUERY_KEY, name, lesson],
    () => fetchThirdLesson(lesson || ''),
    {
      onSuccess: (lessonsData) => { 
        if(!lessonsData) return;
        setForeignWord(lessonsData.foreignWord);
        const { firstPart, secondPart } = splitTheSentence(lessonsData.foreignSentence, lessonsData.foreignWord);
        setFirstPartForeign(firstPart);
        setSecondPartForeign(secondPart);
        dispatch(setRightAnswer(lessonsData.foreignWord));
      },
    }
  );

  const { data: allWords, isLoading: isWordsLoading } = useQuery(
    [ALL_WORDS, name, lesson],
    () => fetchAllWords(),
    {
      enabled: !!lessonsData,
      onSuccess: (allWords) => {
        if (!allWords|| !lessonsData) return;

        const punctuation = [',', '.', '-', '?', '...', '!'];
        const wordsArray = splitSentenceToWords(lessonsData.hebrewSentence, allWords);
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

  const { Paragraph } = Typography;
  const { Title } = Typography;
  const { Button } = Skeleton
  const isLoading = isCardsLoading || isWordsLoading;

  return (
    <div className="text-center h-[400px]">

    <Row className="flex justify-center">
      <Title level={3} className="text-center">תרגמו את המשפט</Title>
    </Row>

    {isLoading ?
      <div className="text-center my-5 !font-medium w-1/2 mx-auto">
      <Button block />
      </div>  
      :
      <HebrewSentenceThird translatedWords={translatedWords} />
    }

      {/* foreign */}
      {isLoading
      ?
      <div className='inline-block relative top-[100px] text-lg w-1/2'>
        <Button block />
      </div>
      :
        <Paragraph className="inline-block relative top-[100px] text-lg">
          {firstPartForeign}
          <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border-0 border-b-2 border-black outline-none text-[16px] text-center mx-2 placeholder-transparent focus:border-black focus:ring-0 text-lg"
              style={{ width: `${foreignWord.length * 10 }px` }}
              placeholder=" "
            />
          {secondPartForeign}
        </Paragraph>
        }
      </div> 
    );
  }

export default MainThird;