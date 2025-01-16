import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { addOneClick } from '../../slices/WordleSlice';
import { wordleType, LetterColor } from '../../ types/WordelType';
import { WordsType } from "../../../../types/types";
import { getLetterColor } from '../../utilts/wordleHelper';
import { GridLetters } from '../../ types/WordelType';

interface WordsGridProps {
  correctAnswer: wordleType[];
  gridAnswer: wordleType[][];
  setGridAnswer: React.Dispatch<React.SetStateAction<wordleType[][]>>;
  gridLetters: GridLetters[];
  setGridLetters: React.Dispatch<React.SetStateAction<GridLetters[]>>;
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
    if (item.letterColor === LetterColor.NotSelected) return 'bg-gray-200';
    if (item.letterColor === LetterColor.Gray) return 'bg-gray-400';
    if (item.letterColor === LetterColor.Green) return 'bg-green-400';
    if (item.letterColor === LetterColor.Yellow) return 'bg-yellow-400';
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
          className="border-none !bg-gray-600 hover:!bg-gray-500 !text-white !font-bold !font-hebrew"
          onClick={handleEnter}
        >
          לחץ
        </Button>
        
        <Button
          className="ml-2 border-none !bg-gray-600 hover:!bg-gray-500 !text-white !font-bold !font-hebrew"
          onClick={handleDelete}
        >
          מחיקה
        </Button>
      </div>
    </>
  );
};

export default LettersGrid;
