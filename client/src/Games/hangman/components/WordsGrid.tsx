// react + antd
import React from 'react';
import { Button , Image } from 'antd';

// redux
import { addOneWrongCounter, addOneSuccesssCounter } from "../dataHangman/HangmanSlice"
import { useDispatch } from 'react-redux';
import { hangmanType } from '../types/hangmanType';

import { handleArray, isAnswerTrue } from "../HangHelper";

interface WordsGridProps {
  setLettersArray: any;
  setgameArray: any
  gameArray: Array<hangmanType>
  lettersArray: Array<hangmanType>;
}

const WordsGrid: React.FC<WordsGridProps> = ({ setLettersArray, lettersArray ,gameArray ,setgameArray }) => {

  // redux
  const dispatch = useDispatch();

  // const letters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ך', 'ל',
  //    'מ', 'ם', 'נ', 'ן', 'ס', 'ע', 'פ', 'ף', 'צ', 'ץ', 'ק', 'ר', 'ש', 'ת' ];

  const handleClick = (selectedLetter: string) => {
    const userAnswer: boolean | null = isAnswerTrue(lettersArray ,selectedLetter);

    const updatedLettersArray = handleArray(lettersArray, selectedLetter);
    setLettersArray(updatedLettersArray);

    const updatedGameArray = handleArray(gameArray, selectedLetter);
    setgameArray(updatedGameArray);

    if (userAnswer === false) {
      dispatch(addOneWrongCounter());
    }
    if (userAnswer === true) {
      dispatch(addOneSuccesssCounter());
    }
  }

  return (
    <div className="grid grid-cols-6 gap-2">
      {lettersArray.map((item) => (
        <Button
          key={item.letter}
          type="primary"
          style={{
            color: item.selected ? '#fff' : '#6b7280',
            backgroundColor: item.selected ? '#f87171' : '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: '8px', 
            transition: 'all 0.3s ease',
            padding: '16px 24px', 
            fontSize: '1rem',
          }}
          className={`px-4 py-2 cursor-pointer font-medium rounded-lg text-lg p-3 inline-flex items-center ${item.selected ? 'hover:bg-red-500' : 'hover:translate-y-[-2px] hover:bg-blue-500 hover:text-white'}`}
          onClick={() => handleClick(item.letter)}
        >
          {item.letter}
        </Button>
      ))}
    </div>
  );
  
  
  
}
export default WordsGrid;