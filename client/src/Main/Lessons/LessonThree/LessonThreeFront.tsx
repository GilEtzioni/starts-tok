// react + antd
import React, { useState, useEffect } from 'react';
import { Row, Typography } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess, setFailure, resetClicks } from "../../LessonsSlice";
import { RootState } from "../../../app/store";

// data + components
import { fetchCourseData } from "../LessonsData";
import { filterByOrder, splitTheSentence } from "./LessonThreeHelper";

interface LessonThreeCardsProps {
  levelName: string,
  courseName: string,
  completedLessons: number,
}

const LessonThreeFront: React.FC<LessonThreeCardsProps> =  ({levelName, courseName, completedLessons}) => {

  const order = useSelector((state: RootState) => state.lessons.order);
  const clicks = useSelector((state: RootState) => state.lessons.clicks);
  const dispatch = useDispatch();

  const [germanSentence, setGermanSentence] = useState<string>("");
  const [hebrewSentence, setHebrewSentence] = useState<string>("");
  const [germanWord, setGermanWord] = useState<string>("");
  const [hebrewWord, setHebrewWord] = useState<string>("");

  const [germanSentenceFirstPart, setGermanSentenceFirstPart] = useState<string>("");
  const [germanSentenceSecondPart, setGermanSentenceSecondPart] = useState<string>("");
  const [hebrewSentenceFirstPart, setHebrewSentenceFirstPart] = useState<string>("");
  const [hebrewSentenceSecondPart, setHebrewSentenceSecondPart] = useState<string>("");

  const { Title } = Typography;
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          initialMissingGermanSentences,
          initialMissingHebrewSentences,
          initialMissingGermanWords,
          initialMissingHebrewWords,
        } = await await fetchCourseData(levelName, courseName, completedLessons);

        
        const filteredHebrewSentences = filterByOrder(initialMissingHebrewSentences, order);
        const filteredGermanSentences = filterByOrder(initialMissingGermanSentences, order);
        const filteredGermanWords = filterByOrder(initialMissingHebrewWords, order);
        const filteredHebrewWords = filterByOrder(initialMissingGermanWords, order);

        setHebrewSentence(filteredHebrewSentences);
        setGermanSentence(filteredGermanSentences);
        setHebrewWord(filteredHebrewWords);
        setGermanWord(filteredGermanWords);

        const hebrewSplit = splitTheSentence(filteredHebrewSentences, filteredHebrewWords);
        const germanSplit = splitTheSentence(filteredGermanSentences, filteredGermanWords);

        setHebrewSentenceFirstPart(hebrewSplit.firstArrayPart);
        setHebrewSentenceSecondPart(hebrewSplit.secondArrayPart);
        setGermanSentenceFirstPart(germanSplit.firstArrayPart);
        setGermanSentenceSecondPart(germanSplit.secondArrayPart);
      } catch (error) {
        console.error('error fetch data:', error);
      }
    };
    fetchData();
  }, [dispatch, order]);

  useEffect(() => {
    if (inputValue === "" && clicks === 1) {
      dispatch(resetClicks());
    }
    else if (inputValue === germanWord && clicks === 1) {
      dispatch(setSuccess());
    } else if (clicks === 1) {
      dispatch(setFailure());
    }
  }, [dispatch, clicks, inputValue, germanWord]);

  return (
    <div style={{ textAlign: "center",height: "400px"}}>

    <Row justify="center" style={{ marginBottom: '0px' }}>
      <Title level={3} style={{ textAlign: 'center' }} >השלימו את המשפט </Title>
    </Row>
  
      {/* hebrew */}
      <p style={{ fontSize: "18px", color: "black", margin: "10px 0" }}>{hebrewSentence}</p>
  
      {/* german */}
      <p style={{ 
          display: "inline-block", 
          position: "relative", 
          top: "100px",
        }}
      >
        {germanSentenceFirstPart}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          style={{
            border: "none",
            borderBottom: "2px solid black",
            outline: "none",
            fontSize: "16px",
            textAlign: "center",
            width: `${ germanWord.length * 10 }px`,
            marginLeft: "8px", 
            marginRight: "8px", 
          }}
        />
        {germanSentenceSecondPart}
      </p>
    </div>
  );
}  

export default LessonThreeFront;
