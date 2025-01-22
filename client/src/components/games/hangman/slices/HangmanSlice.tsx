import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordsType } from '../../../../api/common/types';

export const hangmanSlice = createSlice({
  name: 'hangman',
  initialState: {
    wrongLettersCounter: 0,
    successGamesCounter: 0,
    selectedWord: "",
  },
  reducers: {
    /* wrong counter */
    addOneWrongCounter: (state) => {
      state.wrongLettersCounter += 1;
    },
    resetWrongCounter: (state) => {
      state.wrongLettersCounter = 0;
    },

    setNumberWrongCounter: (state, action: PayloadAction<number>) => {
      state.wrongLettersCounter = action.payload;
    },

    /* success counter */
    addOneSuccesssCounter: (state) => {
      state.successGamesCounter += 1;
    },
    resetSuccesssCounter: (state) => {
      state.successGamesCounter = 0;
    },

    /* selected word */
    setSelectedWord: (state, action: PayloadAction<string>) => {
      state.selectedWord = action.payload;
    },
  },
});

export const { 
  addOneWrongCounter, 
  resetWrongCounter, 
  addOneSuccesssCounter, 
  resetSuccesssCounter, 
  setSelectedWord,
  setNumberWrongCounter
} = hangmanSlice.actions;

export default hangmanSlice.reducer;