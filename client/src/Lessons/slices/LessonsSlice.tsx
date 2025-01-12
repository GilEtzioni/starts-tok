import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LessonStatus } from '../types/LessonType';

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    status: LessonStatus.Running,
    order: 1,
    clicks: 0,
    anwser: "",
  },

  reducers: {
    /* status */
    setRunning: (state) => {
      state.status = LessonStatus.Running;
    },

    setSuccess: (state) => {
      state.status = LessonStatus.Success;
    },

    setFailure: (state) => {
      state.status = LessonStatus.Failure;
    },

    /* order */
    resetOrder: (state) => {
      state.order = 1;
    },

    addOneOrder: (state) => {
      state.order += 1;
    },

    changeOrder: (state, action: PayloadAction<number>) => {
        state.order = action.payload;
      },

    /* clicks */
    resetClicks: (state) => {
      state.clicks = 0;
    },

    addOneClick: (state) => {
      state.clicks += 1;
    },

    /* answer */
    setRightAnswer: (state, action: PayloadAction<string>) => {
        state.anwser = action.payload;
    },

    resetAnswer: (state) => {
        state.anwser = "";
    },
  },
});

export const { 
  setRunning, 
  setSuccess, 
  setFailure, 
  resetOrder, 
  addOneOrder, 
  changeOrder, 
  resetClicks, 
  addOneClick,
  setRightAnswer,
  resetAnswer
} = lessonsSlice.actions;

export default lessonsSlice.reducer;
