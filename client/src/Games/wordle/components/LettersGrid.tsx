import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { addOneClick } from '../slices/WordleSlice';
import { wordleType, letterColor } from '../ types/WordelType';
import { WordsType } from '../../hangman/types/types';
import { getLetterColor } from '../utilts/wordleHelper';

interface WordsGridProps {
  correctAnswer: wordleType[];
  gridAnswer: wordleType[][];
  setGridAnswer: React.Dispatch<React.SetStateAction<wordleType[][]>>;
  gridLetters: Array<{ letter: string; letterColor: letterColor }>;
  setGridLetters: React.Dispatch<React.SetStateAction<Array<{ letter: string; letterColor: letterColor }>>>;
  allWords: WordsType[];
}

const LettersGrid: React.FC<WordsGridProps> = ({
  correctAnswer,
  gridAnswer,
  setGridAnswer,
  gridLetters,
  setGridLetters,
  allWords,
}) => {
  const clicksCounter = useSelector(
    (state: RootState) => state.wordel.clicksCounter
  );
  const dispatch = useDispatch();

  function handleLetterClick(letter: string) {
    let columnIndex =
      gridAnswer[clicksCounter]?.findIndex((item) => item === null) ?? -1;
    if (columnIndex === -1) columnIndex = correctAnswer.length;
    if (columnIndex !== correctAnswer.length) {
      const color = getLetterColor(letter, columnIndex, correctAnswer);
      const newLetter: wordleType = {
        letterColor: color,
        letter,
        isInGame: false,
      };
      const result = [...gridAnswer];
      result[clicksCounter][columnIndex] = newLetter;
      setGridAnswer(result);
    }
  }

  function handleDelete() {
    if (!gridAnswer[clicksCounter]?.length) return;
    const columnIndex = gridAnswer[clicksCounter]
      .slice()
      .reverse()
      .findIndex((item) => item !== null);
    if (columnIndex !== -1) {
      const actualIndex = gridAnswer[clicksCounter].length - 1 - columnIndex;
      const result = [...gridAnswer];
      result[clicksCounter][actualIndex] = null;
      setGridAnswer(result);
    }
  }

  function handleEnter() {
    dispatch(addOneClick());
  }

  const letterStyle = (item: any) => {
    if (!item) return '';
    if (item.letterColor === letterColor.notSelected) return 'bg-gray-200';
    if (item.letterColor === letterColor.gray) return 'bg-gray-400';
    if (item.letterColor === letterColor.green) return 'bg-green-400';
    if (item.letterColor === letterColor.yellow) return 'bg-yellow-400';
    return '';
  };

  return (
    <>
      <div className="grid grid-cols-10 gap-2">
        {gridLetters?.map((item) => (
          <Button
            key={`${item.letter}-${item.letterColor}`}
            className={`border-none !bg-gray-500 hover:!bg-gray-400 !text-white !font-bold ${letterStyle(item)}`}
            onClick={() => handleLetterClick(item.letter)}
          >
            {item.letter}
          </Button>
        ))}
      </div>
      <div className="mt-4">
        <Button
          className="border-none !bg-gray-600 hover:!bg-gray-500 !text-white !font-bold"
          onClick={handleEnter}
        >
          Enter
        </Button>
        <Button
          className="ml-2 border-none !bg-gray-600 hover:!bg-gray-500 !text-white !font-bold"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default LettersGrid;
