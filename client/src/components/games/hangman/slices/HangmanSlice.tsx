import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordsType } from '../../../../api/common/types';
import { HANGMAN_FINISHED_NUMBER } from '../../common/consts';

const initialState = {
  wrongLettersCounter: HANGMAN_FINISHED_NUMBER,
  successGamesCounter: 0,
  selectedWord: "",
};

export const hangmanSlice = createSlice({
  name: 'hangman',
  initialState,
  reducers: {
    /* reset */
    resetHangman: (state) => {
      Object.assign(state, initialState);
    },

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
  setNumberWrongCounter,
  resetHangman
} = hangmanSlice.actions;

export default hangmanSlice.reducer;