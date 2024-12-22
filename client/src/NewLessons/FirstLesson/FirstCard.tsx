import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { checkCouples } from "./FirstHelper";

interface FirstCardProps {
  language: string;
  word: string;
  id: number;
}

const FirstCard: React.FC<FirstCardProps> = ({ language, word, id }) => {

    const [hebrewWord, setHebrewWord] = useState("");
    const [germanWord, setGermanWord] = useState("");
    const [germanId, setGermanId] = useState(0);
    const [hebrewId, setHebrewId] = useState(0);
    const [isEqual, setIsEqual] = useState(false);
  
    const handleClickGerman = (word: string, id: number) => {
      if (word === germanWord) {
          setGermanWord(""); // Deselect if clicking the same card
          setGermanId(0);
        } else {
          setGermanWord(word); // Select new German word
          setGermanId(id);
        }
      }
      const handleClickHebrew = (word: string, id: number) =>  {
        if (word === hebrewWord) {
          setHebrewWord(""); // Deselect if clicking the same card
          setHebrewId(0);
        } else {
          setHebrewWord(word); // Select new Hebrew word
          setHebrewId(id);
        }
      }
    
  useEffect(() => {
    console.log("hebrewWord", hebrewWord);
    console.log("germanWord", germanWord);
    console.log("hebrewId", hebrewId);
    console.log("germanId", germanId);
  }, [hebrewWord, germanWord, hebrewId, germanId]);

  return (
    <>
      {language === "german" && (
        <Card hoverable={true}  onClick={() => handleClickGerman(word, id)} >
          <p>{word}</p>
        </Card>
      )}

      {language === "hebrew" && (
        <Card hoverable={true}   onClick={() => handleClickHebrew(word, id)} >
          <p>{word}</p>
        </Card>
      )}
    </>
  );
};

export default FirstCard;
