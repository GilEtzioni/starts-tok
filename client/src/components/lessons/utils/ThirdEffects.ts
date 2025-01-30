import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFailure } from "../slices/LessonsSlice";
import { MissingWordType } from "../../../api/common/types";
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

interface useHandleInputProps {
    lessonsData: MissingWordType | undefined | null;
    order: number;
    dispatch: ReturnType<typeof useDispatch>;
    foreignWord: string;
    clicks: number;
    inputValue: string;
    setSuccess: ActionCreatorWithoutPayload;
    resetClicks: ActionCreatorWithoutPayload;
}

export const useHandleInput = ({ dispatch, resetClicks, setSuccess, foreignWord, clicks, inputValue }: useHandleInputProps) => {
    useEffect(() => {
        if (inputValue === "" && clicks === 1) {
          dispatch(resetClicks());
        }
        else if (inputValue.toLocaleLowerCase() === foreignWord.toLocaleLowerCase() && clicks === 1) {
          dispatch(setSuccess());
        } else if (clicks === 1) {
          dispatch(setFailure());
        }
      }, [dispatch, clicks, inputValue, foreignWord]);
}