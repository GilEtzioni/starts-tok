import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LessonName, LessonStatus } from '../types/LessonType';

const generateShuffledNumbers = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    status: LessonStatus.Running,
    order: 1,
    randomOrder: 1,
    randomOrderList: generateShuffledNumbers(),
    randomIndex: 0,
    clicks: 0,
    anwser: "",
    points: 0,
    lessonName: LessonName.Loading,
    time: new Date().getTime(),
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
      state.randomOrderList = generateShuffledNumbers();
      state.randomIndex = 0;
      state.randomOrder = state.randomOrderList[0];
    },

    addOneOrder: (state) => {
      state.order += 1;
      
      if (state.randomIndex >= state.randomOrderList.length - 1) {
        state.randomOrderList = generateShuffledNumbers();
        state.randomIndex = 0;
      } else {
        state.randomIndex += 1;
      }
      
      state.randomOrder = state.randomOrderList[state.randomIndex];
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

    /* points */
    resetPoints: (state) => {
      state.points = 0;
    },

    addOnePoint: (state) => {
      state.points += 1;
    },

    /* lesson */
    setLessonName: (state, action: PayloadAction<LessonName>) => {
      state.lessonName = action.payload;
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
  resetAnswer,
  resetPoints,
  addOnePoint,
  setLessonName
} = lessonsSlice.actions;

export default lessonsSlice.reducer;
