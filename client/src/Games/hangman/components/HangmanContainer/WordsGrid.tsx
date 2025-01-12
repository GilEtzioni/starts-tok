// react + antd
import React from 'react';
import { Button } from 'antd';

// redux
import { addOneWrongCounter } from "../../slices/HangmanSlice";
import { useDispatch } from 'react-redux';
import { HangmanType } from '../../types/hangmanType';

import { handleArray, isAnswerTrue } from "../../utils/HangHelper";

interface WordsGridProps {
  setLettersArray: (arr: HangmanType[]) => void;
  setGameArray: (arr: HangmanType[]) => void;
  gameArray: HangmanType[]
  lettersArray: HangmanType[];
}

const WordsGrid: React.FC<WordsGridProps> = ({ setLettersArray, lettersArray ,gameArray ,setGameArray }) => {

    // redux
    const dispatch = useDispatch();

    const handleClick = (selectedLetter: string) => {
      const userAnswer: boolean | null = isAnswerTrue(lettersArray ,selectedLetter);

      const updatedLettersArray = handleArray(lettersArray, selectedLetter);
      setLettersArray(updatedLettersArray);

      const updatedGameArray = handleArray(gameArray, selectedLetter);
      setGameArray(updatedGameArray);

      if (userAnswer === false) {
        dispatch(addOneWrongCounter());
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