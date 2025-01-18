import { useEffect } from 'react';
import { getGermanWords, shuffleArray, getUserAnswer, getGermanSentence, areStringsEqual, splitSentenceToWords, getHebrewSentence } from './SecondHelper';
import { useDispatch } from 'react-redux';
import { WordsType, LessonType } from "../../../types/types";
import { TranslatedArray, germanArrayType } from '../types/SecondLessonType';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { setRightAnswer } from '../slices/LessonsSlice';

interface UseGetDataProps {
  lessonsData: LessonType[] | undefined;
  order: number;
  setGermanArray: (array: germanArrayType[]) => void;
  setHebrewSentence: (str: string) => void;
  dispatch: ReturnType<typeof useDispatch>;
}

interface UseHandleNextProps {
  clicks: number;
  dispatch: ReturnType<typeof useDispatch>;
  resetClicks: ActionCreatorWithoutPayload;
  setSuccess: ActionCreatorWithoutPayload;
  setFailure: ActionCreatorWithoutPayload;
  lessonsData: LessonType[] | undefined;
  germanArray: germanArrayType[];
  order: number;
}

interface useHandleDataProps {
  hebrewSentence: string;  
  wordsData: WordsType[] | undefined;
  setTranslatedWords: (array: TranslatedArray[]) => void;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useGetData = ({ lessonsData, order, setGermanArray, setHebrewSentence, dispatch }: UseGetDataProps) => { 
  useEffect(() => {

    if(lessonsData === undefined) return;

      // get the data
      const originalGermanArray = getGermanWords(lessonsData[0], order);
      const hebrewSentence = getHebrewSentence(lessonsData[0], order);
      const germanSentence = getGermanSentence(lessonsData[0], order);
      const shuffledGerman = shuffleArray(originalGermanArray);

      setGermanArray(shuffledGerman);
      setHebrewSentence(hebrewSentence);
      dispatch(setRightAnswer(germanSentence));

  }, [lessonsData, order, setGermanArray]);
};

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleNext = ({ clicks, dispatch, resetClicks, setSuccess, setFailure, lessonsData, germanArray, order }: UseHandleNextProps) => { 
  useEffect(() => {

    if (lessonsData === undefined) return;

    const userAnswer = getUserAnswer(lessonsData[0], germanArray, order);  // user answer
    const rightAnswer = getGermanSentence(lessonsData[0], order);          // right answer
    const isUserRight: boolean = areStringsEqual(userAnswer, rightAnswer); 

    if(clicks === 1) {
        // the user click before enter data - reset
        if (userAnswer === "" ) {
            dispatch(resetClicks());
        }
        else {
            // right answer
            if (isUserRight) {
                dispatch(setSuccess());
            }
            // wrong answer
            else {
                dispatch(setFailure());
            }
        }
    }
  },[clicks])
};

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleData = ({ hebrewSentence, wordsData, setTranslatedWords }: useHandleDataProps) => { 
  useEffect(() => {

    if (wordsData === undefined) return;

    const punctuation = [',', '.', '-', '?', '...', '!'];
    const wordsArray = splitSentenceToWords(hebrewSentence, wordsData);
    if (!wordsArray) return;

    const copiedArray = [...wordsArray];
    const firstItem = copiedArray.shift();
    const lastItemIndex = copiedArray.length - 1;

    if (firstItem && punctuation.includes(firstItem.hebrewString) && lastItemIndex >= 0) {
        copiedArray[lastItemIndex].hebrewString =
            firstItem.hebrewString + copiedArray[lastItemIndex].hebrewString;
    } 
    else if (firstItem) {
        copiedArray.unshift(firstItem);
    }

    setTranslatedWords(copiedArray);

  }, [hebrewSentence, wordsData]);
};