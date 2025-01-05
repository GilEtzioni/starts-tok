import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CurrentMode = "running" | "failure" | "success" | "notInDictionary" | "notEnoughLetters";

export const WordleSlice = createSlice({
  name: 'wordel',
  initialState: {
    clicksCounter: 0,
    successCounter: 0,
    currentMode: "running" as CurrentMode,
  },

  reducers: {
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

export const { addOneClick, resetClicks, addOneSuccess, resetSuccess, setCurrentMode, minusOneClick } = WordleSlice.actions;

export default WordleSlice.reducer;