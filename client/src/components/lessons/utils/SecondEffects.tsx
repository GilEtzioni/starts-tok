import { useEffect } from 'react';
import { getUserAnswer, areStringsEqual } from './lessonsHelper';
import { useDispatch } from 'react-redux';
import { CardType } from '../types/SecondLessonType';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { SenteceType } from '../../../api/common/types';

interface UseHandleNextProps {
  clicks: number;
  dispatch: ReturnType<typeof useDispatch>;
  resetClicks: ActionCreatorWithoutPayload;
  setSuccess: ActionCreatorWithoutPayload;
  setFailure: ActionCreatorWithoutPayload;
  lessonData: SenteceType | undefined | null;
  foreignArray: CardType[] | undefined;
  order: number;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleNext = ({ clicks, dispatch, resetClicks, setSuccess, setFailure, lessonData, foreignArray, order }: UseHandleNextProps) => { 
  useEffect(() => {

    if (!lessonData || lessonData === null || !foreignArray) return;

    const userAnswer = getUserAnswer(lessonData, foreignArray, order);
    const isUserRight: boolean = areStringsEqual(userAnswer, lessonData.foreignSentence); 

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