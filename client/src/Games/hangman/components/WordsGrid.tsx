// react + antd
import React from 'react';
import { Button , Image } from 'antd';

import "../../../index.css";

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
        className={`!border !border-gray-200 !rounded-lg !transition-all !duration-300 !ease-in-out !px-6 !py-4 !text-base ${
          item.selected
            ? '!text-white !bg-red-400 hover:!bg-red-400'
            : '!text-gray-500 !bg-gray-100 hover:!bg-gray-300 hover:!-translate-y-1'
        }`}
        onClick={() => !item.selected && handleClick(item.letter)}
      >
        {item.letter}
      </Button>
      ))}
    </div>
  );

}
export default WordsGrid;