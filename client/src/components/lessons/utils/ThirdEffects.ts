import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFailure } from "../slices/LessonsSlice";
import { getGermanSentence, getHebrewSentence, getGermanWord, splitTheSentence } from './ThirdHelper';
import { LessonType } from "../../../types/types";
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

interface useGetDataProps {
    lessonsData: LessonType[] | undefined;
    order: number;
    setHebrewSentence: React.Dispatch<React.SetStateAction<string>>;
    setGermanWord: React.Dispatch<React.SetStateAction<string>>;
    setFirstPartGerman: React.Dispatch<React.SetStateAction<string>>;
    setSecondPartGerman: React.Dispatch<React.SetStateAction<string>>;
}

interface useHandleInputProps {
    lessonsData: LessonType[] | undefined;
    order: number;
    dispatch: ReturnType<typeof useDispatch>;
    germanWord: string;
    clicks: number;
    inputValue: string;
    setSuccess: ActionCreatorWithoutPayload;
    resetClicks: ActionCreatorWithoutPayload;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useGetData = ({ lessonsData, order, setHebrewSentence , setGermanWord, setFirstPartGerman, setSecondPartGerman}: useGetDataProps) => {
    useEffect(() => {
      if (lessonsData === undefined) return;

      const lesson = lessonsData[0];
      const germanSentence = getGermanSentence(lesson, order);
      const hebrewSentence = getHebrewSentence(lesson, order);
      const germanWord = getGermanWord(lesson, order);

      setHebrewSentence(hebrewSentence);
      setGermanWord(germanWord);


      // split the German sentence
      const { firstPart, secondPart } = splitTheSentence(germanSentence, germanWord);
      setFirstPartGerman(firstPart);
      setSecondPartGerman(secondPart);

  }, [lessonsData, order, setHebrewSentence, setGermanWord, setFirstPartGerman, setSecondPartGerman]);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleInput = ({ dispatch, resetClicks, setSuccess, germanWord, clicks, inputValue }: useHandleInputProps) => {
    useEffect(() => {
        if (inputValue === "" && clicks === 1) {
          dispatch(resetClicks());
        }
        else if (inputValue === germanWord.toLocaleLowerCase() && clicks === 1) {
          dispatch(setSuccess());
        } else if (clicks === 1) {
          dispatch(setFailure());
        }
      }, [dispatch, clicks, inputValue, germanWord]);
}
