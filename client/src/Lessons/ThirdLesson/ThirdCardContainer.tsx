// react + antd
import React, { useEffect, useState } from 'react';
import { Row, Typography } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setRightAnswer, resetClicks, setSuccess } from "../dataLessons/LessonsSlice";
import { RootState } from "../../app/store";

// components
import { LessonType } from '../types/lessonType';
import { useGetData , useHandleInput} from "./ThirdEffects"
import "./Third.css";

interface ThirdCardContainerProps {
    lessons: LessonType[];
}

const ThirdCardContainer: React.FC<ThirdCardContainerProps> = ({ lessons }) => {

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

    const { Title } = Typography; // antd title

    // get and set the data
    useGetData({ lessonsData: lessons, order, setHebrewSentence , setGermanWord, setFirstPartGerman, setSecondPartGerman});

    // handle the input
    useHandleInput({ lessonsData: lessons, order, dispatch, resetClicks, setSuccess, germanWord, clicks, inputValue });

    useEffect(() => {
      if (germanWord) {
        dispatch(setRightAnswer(germanWord));
      }
    }, [dispatch, germanWord, hebrewSentence]);
  

      return (
        <div className="sentence-container">
          
        <Row justify="center" style={{ marginBottom: '10px' }}>
            <Title level={3} style={{ textAlign: 'center' }}  > השלימו את המשפט </Title>
        </Row>
      
          {/* hebrew */}
          <p className="hebrew-sentence">{hebrewSentence}</p>
      
          {/* german */}
          <p className="german-sentence">
            {firstPartGerman}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="german-input"
              style={{ width: `${germanWord.length * 10}px` }}
            />
            {secondPartGerman}
          </p>
        </div>
      );
    }

export default ThirdCardContainer;
