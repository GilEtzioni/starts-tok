import React from 'react';
import { WordsType } from "../../../Dictionarys/types/wordType";

interface CourseNameProps {
  randomWord: WordsType[];
}

const CourseName: React.FC<CourseNameProps> = ({ randomWord }) => {
  return (
    <div>
      {randomWord.length > 0 && (
        <p>{randomWord[0].HebrewWord}</p>
      )}
    </div>
  );
};

export default CourseName;