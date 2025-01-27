import { useEffect } from 'react';
import { WordsType } from "../../../../api/common/types";
import { wordleType, LetterColor, LetterSeleceted } from '../ types/WordelType';
import { addOneSuccess, setCurrentMode } from '../slices/WordleSlice';
import { useDispatch } from 'react-redux';
import { CurrentMode } from '../ types/WordelType';

export interface useEnterClickProps {
  clicksCounter: number;
  setGridAnswer: (array: wordleType[][]) => void;
  gridAnswer: wordleType[][];
  words: WordsType[] | undefined;
  dispatch: ReturnType<typeof useDispatch>;
  correctAnswer: wordleType[];
  gridLetters: wordleType[],
  setGridLetters: (array: wordleType[]) => void,
}

export const useEnterClick = ({ clicksCounter, setGridAnswer, gridAnswer, words, dispatch, correctAnswer, gridLetters, setGridLetters }: useEnterClickProps) => {
  useEffect(() => {
    if (gridAnswer?.length === 0 || !words || !gridLetters) return;

    const result = [...gridAnswer];
    const numOfLettersSucces: number = gridAnswer[clicksCounter - 1]?.filter((item) => item?.color === LetterColor.Green).length || 0;
    
    if (clicksCounter === 0) return;

      // set gridAnswer
      const updatedAnswerArray = gridAnswer[clicksCounter - 1].map((item) => {
        return { 
          ...item, 
          selected: LetterSeleceted.Selected,
        };
      }).filter(Boolean); 
      
      const updatedGridAnswer = [...gridAnswer];
      updatedGridAnswer[clicksCounter - 1] = updatedAnswerArray as wordleType[];
      setGridAnswer(updatedGridAnswer);

      // set gridLetters
      const oneRowArray = [...gridAnswer[clicksCounter - 1]];

      const updatedGridLetters = gridLetters.map((firstItem) => {
        let updatedItem = { ...firstItem };
      
        oneRowArray.forEach((secondItem) => {
          if (firstItem?.selected === LetterSeleceted.Clicked && !secondItem || firstItem?.letter !== secondItem?.letter) return;
      
          console.log("5")
          const greenLetterCounter = oneRowArray.find(
            (item) => item?.letter === firstItem?.letter && item?.color === LetterColor.Green
          )?.letter.length;
          
          // the current letter is green (at least one time)
          if (greenLetterCounter) {
            updatedItem = {
              ...updatedItem,
              color: LetterColor.Green,
              selected: LetterSeleceted.Selected,
            };
          } else {
            updatedItem = {
              ...updatedItem,
              color: secondItem?.color,
              selected: LetterSeleceted.Selected,
            };
          }
        });
      
        return updatedItem;
      });
      
      setGridLetters(updatedGridLetters as wordleType[]);

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

    // failure message
    if (clicksCounter > 4 && numOfLettersSucces !== correctAnswer.length) {
      dispatch(setCurrentMode(CurrentMode.Failure));
  }}, [clicksCounter]);
};