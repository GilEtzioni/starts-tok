import React, { useState, useEffect } from 'react';
import { useGlobalClicked } from "../GlobalClickedContext";
import { fetchCourseData } from "../LessonsData";
import { filterByOrder, splitTheSentence } from "./LessonThreeHelper";

interface LessonThreeFrontProps {
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  order: string;
}

const LessonThreeFront: React.FC<LessonThreeFrontProps> = ({ setFinished, setError, order }) => {
  const [germanSentence, setGermanSentence] = useState<string>("");
  const [hebrewSentence, setHebrewSentence] = useState<string>("");
  const [germanWord, setGermanWord] = useState<string>("");
  const [hebrewWord, setHebrewWord] = useState<string>("");

  const [germanSentenceFirstPart, setGermanSentenceFirstPart] = useState<string>("");
  const [germanSentenceSecondPart, setGermanSentenceSecondPart] = useState<string>("");
  const [hebrewSentenceFirstPart, setHebrewSentenceFirstPart] = useState<string>("");
  const [hebrewSentenceSecondPart, setHebrewSentenceSecondPart] = useState<string>("");

  const { isClicked } = useGlobalClicked();
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
        } = await fetchCourseData("A1", "Greetings");

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
        console.log(error);
        setError(true);
      }
    };

    setError(false);
    fetchData();
  }, [order, setError]);

  useEffect(() => {
    if (isClicked) {
      if (inputValue === germanWord) {
        console.log("equal in three");
        setFinished(true);
      } else {
        console.log("not equal in three");
        setError(true);
      }
    }
    
  }, [isClicked, inputValue, germanWord, setFinished, setError]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>השלימו את המשפט</h1>
  
      {/* hebrew */}
      <p style={{ fontSize: "18px", color: "black", margin: "10px 0" }}>{hebrewSentence}</p>
  
      {/* german */}
      <p style={{ 
          display: "inline-block", 
          position: "relative", 
          top: "100px"
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
            width: `${germanWord.length * 10}px`,
          }}
        />
        {germanSentenceSecondPart}
      </p>
    </div>
  );
}  

export default LessonThreeFront;
