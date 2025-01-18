import React from 'react';
import { Button, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../../app/store';
import { addOneClick } from '../../slices/WordleSlice';
import { wordleType, LetterColor, LetterSeleceted, CurrentMode } from '../../ types/WordelType';
import { getLetterColor } from '../../utilts/wordleHelper';
import classNames from 'classnames';
import { useEnterClick } from '../../utilts/WordelEffects';
import { WordsType } from '../../../../../types/types';
import { setCurrentMode } from '../../slices/WordleSlice';

interface WordsGridProps {
  correctAnswer: wordleType[];
  gridAnswer: wordleType[][];
  setGridAnswer: React.Dispatch<React.SetStateAction<wordleType[][]>>;
  gridLetters: wordleType[];
  setGridLetters: React.Dispatch<React.SetStateAction<wordleType[]>>;
  words: WordsType[] | undefined;
}

const LettersGrid: React.FC<WordsGridProps> = ({
  correctAnswer,
  gridAnswer,
  setGridAnswer,
  gridLetters,
  setGridLetters,
  words
}) => {
  const clicksCounter = useSelector(
    (state: RootState) => state.wordel.clicksCounter
  );
  const dispatch = useDispatch();

  function handleLetterClick(letter: string | undefined, letterObject: wordleType | undefined) {
    if (!letter || !letterObject || (letterObject.color === LetterColor.Gray && letterObject.selected === LetterSeleceted.Selected)) return;

    const columnIndex = gridLetters.findIndex((item) => item?.letter === letter);
    const rowIndex = gridAnswer[clicksCounter]?.findIndex((item) => item === null) ?? -1;
    if (rowIndex !== correctAnswer.length) {
      const letterColor = getLetterColor(letter, rowIndex, correctAnswer);
      const newLetterAnswer: wordleType = {
        letter,
        color: letterColor,
        selected: LetterSeleceted.Clicked,
      };
      const newLetterGrid: wordleType = {
        letter,
        color: letterObject.color,
        selected: LetterSeleceted.Clicked,
      };
      const answerResult = [...gridAnswer];
      answerResult[clicksCounter][rowIndex] = newLetterAnswer;
      setGridAnswer(answerResult);

      const letterResult = [...gridLetters];
      letterResult[columnIndex] = newLetterGrid;
      setGridLetters(letterResult);
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
    if (!words) return;
    const currentWord = gridAnswer[clicksCounter]?.map((item) => item?.letter).join('') || '';
    const isWordInDataBase: boolean = words.some((item) => item.germanWord.toLowerCase() === currentWord.toLowerCase());
    const userAnswerLength: number = gridAnswer[clicksCounter]?.filter((item) => item !== null).length || 0;
    const answerLength = correctAnswer.length;

    // too short word message
    if (userAnswerLength < answerLength) {
      dispatch(setCurrentMode(CurrentMode.NotEnoughLetters));
    }

    // not a vlid word message
    else if (!isWordInDataBase) {
      dispatch(setCurrentMode(CurrentMode.NotInDictionary));
    }
    else dispatch(addOneClick())
  }

  useEnterClick({ clicksCounter, setGridAnswer, gridAnswer, dispatch, correctAnswer, words, gridLetters, setGridLetters });

  return (
    <>
      <div className="grid grid-cols-10 gap-2">
        {gridLetters?.map((item) => (
        <Card
          key={item?.letter}
          className={classNames(
            'text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear !font-hebrew', 
            {
              "hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1 duration-300 ease-in-out hover:-translate-y-0.5":
                item?.selected === LetterSeleceted.NotSelected || item?.selected === LetterSeleceted.Clicked,

              "hover:bg-green-500 bg-green-500 text-white border border-green-600 border-b-4 border-0 duration-300 ease-in-out hover:-translate-y-0.5":
                item?.selected !== LetterSeleceted.NotSelected &&  item?.color === LetterColor.Green,

                "hover:bg-yellow-500 bg-yellow-500 text-white border border-yellow-600 border-b-4 border-0 duration-300 ease-in-out hover:-translate-y-0.5":
                item?.selected !== LetterSeleceted.NotSelected &&  item?.color === LetterColor.Yellow,

                "hover:bg-gray-500  bg-gray-500 text-white border border-gray-600 border-b-4 border-0":
                item?.selected !== LetterSeleceted.NotSelected &&  item?.color === LetterColor.Gray,
            }
          )}
          onClick={() => handleLetterClick(item?.letter, item)}
        >
          {item?.letter}
        </Card>
      ))}
      </div>
      
      <div className="mt-4">
        
      <Button
          className="!hover:bg-gray-100 !hover:cursor-pointer !border !border-gray-100 !border-b-4 !border-1 !duration-300 ease-in-out hover:-translate-y-0.5"
          onClick={handleDelete}
        >
          מחיקה
        </Button>
        
        <Button
          className="!hover:bg-gray-100 !hover:cursor-pointer !border !border-gray-100 !border-b-4 !border-1 !duration-300 ease-in-out hover:-translate-y-0.5"
          onClick={handleEnter}
        >
          לחץ
        </Button>

      </div>
    </>
  );
};

export default LettersGrid;