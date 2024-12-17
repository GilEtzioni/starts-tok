import React, { useState, useEffect } from 'react';
import { fetchCourseData } from "../LessonsData";
import { filterByOrder, splitTheSentence } from "./LessonThreeHelper";
import { Row } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { setRunning, setSuccess, setFailure, resetOrder, addOneOrder, changeOrder, resetClicks, addOneClick } from "../../LessonsSlice";
import { RootState } from "../../../app/store";

interface LessonThreeCardsProps {
  levelName: string,
  courseName: string,
  completedLessons: number,
}

const LessonThreeFront: React.FC<LessonThreeCardsProps> =  ({levelName, courseName, completedLessons}) => {

  const status = useSelector((state: RootState) => state.lessons.status);
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
      console.log("do nothing in 3")
    }
    else if (inputValue === germanWord && clicks === 1) {
      console.log("equal in three");
      dispatch(setSuccess());
    } else if (clicks === 1) {
      console.log("not equal in three");
      dispatch(setFailure());
    }
  }, [dispatch, clicks, inputValue, germanWord]);

  return (
    <div style={{ textAlign: "center",height: "400px"}}>

      <Row justify="center" style={{ marginBottom: '0px' }}>
      <h1 style={{ textAlign: 'center' }}>השלימו את המשפט</h1>
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
