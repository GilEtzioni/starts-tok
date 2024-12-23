import { useEffect } from 'react';
import { getGermanWords, shuffleArray, getUserAnswer, getGermanSentence, areStringsEqual } from './SecondHelper';
import { LessonType } from '../types/lessonType';
import { useDispatch } from 'react-redux';

interface UseGetDataProps {
  lessonsData: LessonType[];
  order: number;
  setGermanArray: (array: Array<{ id: number; containerOrder: number; word: string; container: string }>) => void;
}

interface UseHandleNextProps {
  clicks: number;
  dispatch: ReturnType<typeof useDispatch>;
  resetClicks: any;
  setSuccess: any;
  setFailure: any;
  lessonsData: LessonType[];
  germanArray: Array<{ id: number; containerOrder: number; word: string; container: string }>;
  order: number;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useGetData = ({ lessonsData, order, setGermanArray }: UseGetDataProps) => { 
  useEffect(() => {

      // get the data
      const originalGermanArray = lessonsData.flatMap(lesson => getGermanWords(lesson, order));

      // shuffle and set array
      const shuffledGerman = shuffleArray(originalGermanArray).map(([id, containerOrder, word, container]) => 
        ({ id, containerOrder, word, container,}));
      
      setGermanArray(shuffledGerman);

  }, [lessonsData, order, setGermanArray]);
};

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleNext = ({ clicks, dispatch, resetClicks, setSuccess, setFailure, lessonsData, germanArray, order }: UseHandleNextProps) => { 
  useEffect(() => {

    const userAnswer = getUserAnswer(lessonsData[0], germanArray, order);  // user answer
    const rightAnswer = getGermanSentence(lessonsData[0], order);          // right answer
    const isUserRight: boolean = areStringsEqual(userAnswer, rightAnswer); 
    console.log("isUserRight", isUserRight);

    console.log("userAnswer", userAnswer);
    console.log("rightAnswer", rightAnswer);

    // first click
    if(clicks === 1) {
        // the user click before enter data - reset
        if (userAnswer === "" ) {
            dispatch(resetClicks());
        }
        // if the user enter data
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