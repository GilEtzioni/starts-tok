import { useEffect } from 'react';
import { getGermanWords, shuffleArray, getUserAnswer, getGermanSentence, areStringsEqual, splitSentenceToWords } from './SecondHelper';
import { LessonType } from '../types/lessonType';
import { useDispatch } from 'react-redux';
import { WordsType } from '../types/lessonType';

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

interface useHandleDataProps {
  hebrewSentence: string;  
  wordsData: WordsType[];
  setWords: any;
  splitSentenceToWords: any;
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

export const useHandleData = ({ splitSentenceToWords, hebrewSentence, wordsData, setWords }: useHandleDataProps) => { 
  useEffect(() => {
    const punctuation = [',', '.', '-', '?', '...', '!'];
    const wordsArray = splitSentenceToWords(hebrewSentence, wordsData);
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

    setWords(copiedArray);
  }, [hebrewSentence, wordsData]);
};

