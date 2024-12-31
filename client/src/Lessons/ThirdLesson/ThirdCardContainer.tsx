// react + antd
import React, { useEffect, useState } from 'react';
import { Row, Typography } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setRightAnswer, resetClicks, setSuccess } from "../dataLessons/LessonsSlice";
import { RootState } from "../../app/store";

// components
import { LessonType, WordsType } from '../types/lessonType';
import { useGetData , useHandleInput} from "./ThirdEffects";
import HebrewSentenceThird from './HebrewSentenceThird';
interface ThirdCardContainerProps {
  lessonsData: LessonType[];
    wordsData: WordsType[];
}

const ThirdCardContainer: React.FC<ThirdCardContainerProps> = ({ wordsData, lessonsData }) => {

    // redux
    const order = useSelector((state: RootState) => state.lessons.order);
    const clicks = useSelector((state: RootState) => state.lessons.clicks);
    const dispatch = useDispatch();

    // states
    const [hebrewSentence, setHebrewSentence] = useState<string>("");
    const [germanWord, setGermanWord] = useState<string>("");
    const [firstPartGerman, setFirstPartGerman] = useState<string>("");
    const [secondPartGerman, setSecondPartGerman] = useState<string>("");
  
    // input
    const [inputValue, setInputValue] = useState<string>("");
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => { setInputValue(e.target.value) };
    // get and set the data
    useGetData({ lessonsData, order, setHebrewSentence, setGermanWord, setFirstPartGerman, setSecondPartGerman});

    // handle the input
    useHandleInput({ lessonsData, order, dispatch, resetClicks, setSuccess, germanWord, clicks, inputValue });

    const { Title } = Typography;

    useEffect(() => {
      if (germanWord) {
        dispatch(setRightAnswer(germanWord));
      }
    }, [dispatch, germanWord, hebrewSentence]);

      return (
        <div className="text-center h-[400px]">
          
            <Row className="flex justify-center">
              <Title level={3} className="text-center">תרגמו את המשפט</Title>
            </Row>
            
            <HebrewSentenceThird wordsData={wordsData} hebrewSentence={hebrewSentence} />
      
          {/* german */}
          <p className="inline-block relative top-[100px]">
            {firstPartGerman}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border-0 border-b-2 border-black outline-none text-[16px] text-center mx-2 placeholder-transparent focus:border-black focus:ring-0"
              style={{ width: `${germanWord.length * 10}px` }}
              placeholder=" "
            />
            {secondPartGerman}
          </p>
        </div>
      );
    }

export default ThirdCardContainer;