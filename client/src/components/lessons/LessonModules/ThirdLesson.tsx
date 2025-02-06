// react + antd
import React, { useState } from 'react';
import { Row, Typography, Skeleton, Card, Button } from 'antd'; // Fixed Button import
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setRightAnswer, resetClicks, setSuccess } from "../slices/LessonsSlice";
import { RootState } from "../../../app/store";

// components + utils
import { useHandleInput } from "../utils/ThirdEffects";
import MissingHebrewSentence from '../common/TranslatedSenteces/MissingHebrewSentence';
import { TranslatedArray } from '../types/SecondLessonType';

// fetch
import { fetchThirdLesson } from '../../../api/lessons';
import { THIRD_LESSON_QUERY_KEY } from '../requests/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { useWithAuth } from '../../../api/common/withAuth';

const ThirdLesson: React.FC = () => {

  const { name, lesson } = useParams<{ name: string; lesson?: string }>();

  const order = useSelector((state: RootState) => state.lessons.order);
  const clicks = useSelector((state: RootState) => state.lessons.clicks);
  const dispatch = useDispatch();

  const [foreignWord, setForeignWord] = useState<string>("");
  const [firstPartForeign, setFirstPartForeign] = useState<string>("");
  const [secondPartForeign, setSecondPartForeign] = useState<string>("");
  const [translatedWords, setTranslatedWords] = useState<TranslatedArray[]>([]);
  const [lettersArray, setlettersArray] = useState<string[] | null>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const withAuth = useWithAuth();
  const thirdLesson = async () => withAuth((token) => fetchThirdLesson(lesson ?? "", token));

  const { data: lessonsData, isLoading } = useQuery(
    [THIRD_LESSON_QUERY_KEY, name, lesson, clicks === 2 || order === 1],
    thirdLesson,
    {
      staleTime: Infinity, 
      cacheTime: Infinity,
      onSuccess: (lessonsData) => { 
        if (!lessonsData) return;
        dispatch(resetClicks());
        dispatch(setRightAnswer(lessonsData.foreignWord));
        setInputValue("");
        setForeignWord(lessonsData.foreignWord);
        setFirstPartForeign(lessonsData.firstPartForeign);
        setSecondPartForeign(lessonsData.secondPartForeign);
        setTranslatedWords(lessonsData.translatedArray);
        setlettersArray(lessonsData.letters);
      },
    }
  );

  useHandleInput({ lessonsData, order, dispatch, resetClicks, setSuccess, foreignWord, clicks, inputValue });

  const { Paragraph } = Typography;
  const { Title } = Typography;

  const handleLetterClick = (letter: string) => {
    setInputValue(prev => prev + letter);
  };

  return (
    <div className="text-center h-[400px]">

      <Row className="flex justify-center">
        <Title level={3} className="text-center">השלימו את המשפט</Title>
      </Row>

      {isLoading ? (
        <div className="text-center my-5 !font-medium w-1/2 mx-auto">
          <Button block />
        </div>  
      ) : (
        <MissingHebrewSentence translatedWords={translatedWords} />
      )}

      <div className="flex flex-col items-center justify-center w-full">
        {/* foreign */}
        {isLoading ? (
          <div className="flex flex-wrap justify-center items-start w-1/2 h-[70px] m-2.5 mx-auto gap-2.5 p-2.5 box-border border border-gray-300 rounded-lg">
            <Button block className="mt-1" />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-start w-1/2 h-[70px] m-2.5 mx-auto gap-2.5 p-2.5 box-border border border-gray-300 rounded-lg">
            <Paragraph className="p-2 text-lg">
              {firstPartForeign}
              <input
                type="text"
                value={inputValue}
                onChange={clicks === 0 ? handleInputChange : undefined} 
                className="border-0 border-b-2 border-black outline-none text-[16px] text-center mx-2 placeholder-transparent focus:border-black focus:ring-0 text-lg"
                style={{ width: `${Math.max(inputValue.length * 10, 40)}px` }} 
                placeholder=" "
              />
              {secondPartForeign}
            </Paragraph>
          </div>
        )}

        {/* letters  */}
        <div className="flex justify-center gap-2 mt-4"> 
          {lettersArray !== null &&
            lettersArray.map((item, index) => (
        <Card 
          key={index} 
          onClick={clicks === 0 ? () => handleLetterClick(item) : () => {}} // Ensures valid function
          className="text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1"
        >
          {item}
        </Card>
            ))}
        </div>
      </div> 
    </div>
  );
}

export default ThirdLesson;