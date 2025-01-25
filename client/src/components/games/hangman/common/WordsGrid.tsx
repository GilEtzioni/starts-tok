// react + antd
import React from 'react';
import { Card } from 'antd';

// redux
import { addOneWrongCounter } from "../slices/HangmanSlice";
import { useDispatch } from 'react-redux';
import { HangmanType } from '../types/hangmanType';

import { handleArray, isAnswerTrue } from '../utils/hangHelp';
import { SelectedLetter } from '../types/hangmanType';
import classNames from 'classnames';

interface WordsGridProps {
  setLettersArray: (arr: HangmanType[]) => void;
  setGameArray: (arr: HangmanType[]) => void;
  gameArray: HangmanType[]
  lettersArray: HangmanType[];
}

const WordsGrid: React.FC<WordsGridProps> = ({ setLettersArray, lettersArray ,gameArray ,setGameArray }) => {

    const dispatch = useDispatch();

    const handleClick = (selectedLetter: string) => {
      const userAnswer = isAnswerTrue(lettersArray ,selectedLetter);
      const {updatedLettersArray, updatedGameArray} = handleArray(gameArray, lettersArray, selectedLetter);

      setLettersArray(updatedLettersArray);
      setGameArray(updatedGameArray);

      if (userAnswer === SelectedLetter.Failure) {
        dispatch(addOneWrongCounter());
      }
  }

  return (
    <div className="grid grid-cols-6 gap-2">
      {lettersArray.map((item) => (
        <Card
          key={item.letter}
          className={classNames(
            'text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear', 
            {
              "hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1 duration-300 ease-in-out hover:-translate-y-0.5":
                item.selected === SelectedLetter.NotSelected,
              "bg-green-500 text-white border border-green-600 border-b-4 border-0":
                item.selected === SelectedLetter.Success,
              "bg-red-500 text-white border border-red-600 border-b-4 border-0":
                item.selected === SelectedLetter.Failure,
            }
          )}
          onClick={() => item.selected === SelectedLetter.NotSelected && handleClick(item.letter)}
        >
          {item.letter}
        </Card>
      ))}
    </div>
  );
}
export default WordsGrid;