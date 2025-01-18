// react + antd
import React, { useEffect, useState } from 'react';
import { Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setRightAnswer, resetClicks, setSuccess } from "../slices/LessonsSlice";
import { RootState } from "../../../app/store";

// components
import { useGetData , useHandleInput} from "../utils/ThirdEffects";
import HebrewSentenceThird from './HebrewSentenceThird';
import { useFetchThirdLesson, useFetchWordsData } from '../api/fetchingLessons';

const MainThird: React.FC = () => {

  const { name, lesson } = useParams<{ name: string; lesson: string }>();
  const { data: lessonsData } = useFetchThirdLesson(name || '', lesson || '');
  const { data: wordsData} = useFetchWordsData();

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

  useGetData({ lessonsData, order, setHebrewSentence, setGermanWord, setFirstPartGerman, setSecondPartGerman});
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
      <Title level={3} className="text-center !font-hebrew">תרגמו את המשפט</Title>
    </Row>
             
    <HebrewSentenceThird wordsData={wordsData} hebrewSentence={hebrewSentence} />
      
      {/* german */}
        <p className="inline-block relative top-[100px] !font-hebrew">
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

export default MainThird;