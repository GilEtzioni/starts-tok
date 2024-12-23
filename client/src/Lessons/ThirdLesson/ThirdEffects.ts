import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFailure } from "../LessonsSlice";
import { getGermanSentence, getHebrewSentence, getGermanWord, splitTheSentence } from './ThirdHelper';
import { LessonType } from '../types/lessonType';

interface useGetDataProps {
    lessonsData: LessonType[];
    order: number;
    setHebrewSentence: React.Dispatch<React.SetStateAction<string>>;
    setGermanWord: React.Dispatch<React.SetStateAction<string>>;
    setFirstPartGerman: React.Dispatch<React.SetStateAction<string>>;
    setSecondPartGerman: React.Dispatch<React.SetStateAction<string>>;
}

interface useHandleInputProps {
    lessonsData: LessonType[];
    order: number;
    dispatch: ReturnType<typeof useDispatch>;
    germanWord: string;
    clicks: number;
    inputValue: string;
    setSuccess: any;
    resetClicks: any;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useGetData = ({ lessonsData, order, setHebrewSentence , setGermanWord, setFirstPartGerman, setSecondPartGerman}: useGetDataProps) => {
    useEffect(() => {
        if (lessonsData.length > 0) {
            const lesson = lessonsData[0];

            const germanSentence = getGermanSentence(lesson, order);
            const hebrewSentence = getHebrewSentence(lesson, order);
            const germanWord = getGermanWord(lesson, order);
            
            setHebrewSentence(hebrewSentence);
            setGermanWord(germanWord);

            const { firstArrayPart, secondArrayPart } = splitTheSentence(germanSentence, germanWord);
            setFirstPartGerman(firstArrayPart);
            setSecondPartGerman(secondArrayPart);
        }
    }, [lessonsData]);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleInput = ({ dispatch, resetClicks, setSuccess, germanWord, clicks, inputValue }: useHandleInputProps) => {
    useEffect(() => {
        if (inputValue === "" && clicks === 1) {
          dispatch(resetClicks());
        }
        else if (inputValue === germanWord && clicks === 1) {
          dispatch(setSuccess());
        } else if (clicks === 1) {
          dispatch(setFailure());
        }
      }, [dispatch, clicks, inputValue, germanWord]);
}