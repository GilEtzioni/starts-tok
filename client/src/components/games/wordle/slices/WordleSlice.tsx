import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentMode } from '../ types/WordelType';

const initialState = {
  clicksCounter: 0,
  successCounter: 0,
  currentMode: CurrentMode.Loading,
};

export const WordleSlice = createSlice({
  name: 'wordel',
  initialState,
  reducers: {
    /* reset */
    resetWordle: (state) => {
      Object.assign(state, initialState);
    },

    /* clicks counter */
    addOneClick: (state) => {
      state.clicksCounter += 1;
    },

    minusOneClick: (state) => {
      state.clicksCounter -= 1;
    },

    resetClicks: (state) => {
      state.clicksCounter = 0;
    },

    setClicks: (state, action: PayloadAction<number>) => {
      state.clicksCounter = action.payload;
    },

    /* success counter */
    addOneSuccess: (state) => {
      state.successCounter += 1;
    },
    
    resetSuccess: (state) => {
      state.successCounter = 0;
    },

    /* current mode */
    setCurrentMode: (state, action: PayloadAction<CurrentMode>) => {
      state.currentMode = action.payload;
    },
  },
});

export const {
  addOneClick,
  resetClicks,
  addOneSuccess,
  resetSuccess,
  setCurrentMode,
  minusOneClick,
  setClicks,
  resetWordle
} = WordleSlice.actions;

export default WordleSlice.reducer;