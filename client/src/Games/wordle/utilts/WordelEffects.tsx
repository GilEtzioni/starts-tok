import { useEffect } from 'react';
// types
import { WordsType } from "../../../types/types";
import { wordleType, LetterColor } from '../ types/WordelType';

// functions + redux
import { randomWordsArray, getRandomWord, createLettersGrid } from './wordleHelper';
import { addOneSuccess, minusOneClick, setCurrentMode } from '../slices/WordleSlice';
import { useDispatch } from 'react-redux';
import { CurrentMode } from '../ types/WordelType';

export interface useStartGameProps {
  words: WordsType[] | undefined;
  setCorrectAnswer: (array: wordleType[]) => void;
  setGridAnswer: (array: wordleType[][]) => void;
  setGridLetters: (array: { letter: string; letterColor: LetterColor }[]) => void;
  setAllWords: (array: WordsType[]) => void;
}

export interface useEnterClickProps {
  clicksCounter: number;
  setGridAnswer: (array: wordleType[][]) => void;
  gridAnswer: wordleType[][];
  allWords: WordsType[];
  dispatch: ReturnType<typeof useDispatch>;
  correctAnswer: wordleType[];
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useStartGame = ({ words, setAllWords, setGridAnswer, setCorrectAnswer, setGridLetters }: useStartGameProps) => {
  useEffect(() => {
    if (!words) return;      
      const filterArray = randomWordsArray(words);
      const gameWord = getRandomWord(filterArray);
      const gridLetters = createLettersGrid();

      const ROW_LENGTH = 5;
      const COLUMN_LENGTH = gameWord.length;

      const initialGrid = Array.from({ length: ROW_LENGTH }, () =>
        Array(COLUMN_LENGTH).fill(null)
      );

      setAllWords(filterArray);
      setGridAnswer(initialGrid);
      setCorrectAnswer(gameWord);
      setGridLetters(gridLetters);
    
  }, [words]);
};

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useEnterClick = ({ clicksCounter, setGridAnswer, gridAnswer, allWords, dispatch, correctAnswer }: useEnterClickProps) => {
  useEffect(() => {
    if (gridAnswer?.length === 0) return;

    const currentWord = gridAnswer[clicksCounter - 1]?.map((item) => item?.letter).join('') || '';
    const result = [...gridAnswer];

    const isWordInDataBase: boolean = allWords.some((item) => item.germanWord.toLowerCase() === currentWord.toLowerCase());
    const numOfLettersSucces: number = gridAnswer[clicksCounter - 1]?.filter((item) => item?.letterColor === LetterColor.Green).length || 0;
    const userAnswerLength: number = gridAnswer[clicksCounter - 1]?.filter((item) => item !== null).length || 0;
    const answerLength = correctAnswer.length;
    const correctAnswerString = correctAnswer.map((item) => item?.letter).join('').toLowerCase();
console.log("correctAnswerString", correctAnswerString);
    if (clicksCounter === 0) return;

    // success message
    if (numOfLettersSucces === correctAnswer.length) {
      result[clicksCounter - 1] = result[clicksCounter - 1]?.map((item) => {
        if (item) {
          return { ...item, isInGame: true };
        }
        return item;
      });
      setGridAnswer(result);
      dispatch(addOneSuccess());
      dispatch(setCurrentMode(CurrentMode.Success));
    }

    // too short word message
    if (userAnswerLength < answerLength) {
      dispatch(setCurrentMode(CurrentMode.NotEnoughLetters));
    }

    // not a vlid word message
    else if (!isWordInDataBase && clicksCounter !== 0) {
      dispatch(setCurrentMode(CurrentMode.NotInDictionary));
    }

    // failure message
    if (clicksCounter > 4 && numOfLettersSucces !== correctAnswer.length) {
      console.log("here failure")
      dispatch(setCurrentMode(CurrentMode.Failure));
    }
  }, [clicksCounter]);
};
