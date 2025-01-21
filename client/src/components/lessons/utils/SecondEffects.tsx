import { useEffect } from 'react';
import { getUserAnswer, getForeignSentence, areStringsEqual } from './SecondHelper';
import { useDispatch } from 'react-redux';
import { foreignArrayType } from '../types/SecondLessonType';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { SenteceType } from '../../../api/common/types';

interface UseHandleNextProps {
  clicks: number;
  dispatch: ReturnType<typeof useDispatch>;
  resetClicks: ActionCreatorWithoutPayload;
  setSuccess: ActionCreatorWithoutPayload;
  setFailure: ActionCreatorWithoutPayload;
  lessonsData: SenteceType[] | undefined;
  foreignArray: foreignArrayType[];
  order: number;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleNext = ({ clicks, dispatch, resetClicks, setSuccess, setFailure, lessonsData, foreignArray, order }: UseHandleNextProps) => { 
  useEffect(() => {

    if(!lessonsData) return;

    const lessons = lessonsData[0]
    const userAnswer = getUserAnswer(lessons, foreignArray, order);
    const rightAnswer = getForeignSentence(lessonsData, order);
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