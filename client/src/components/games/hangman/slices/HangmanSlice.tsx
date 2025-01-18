import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordsType } from '../../../../api/common/types';

export const hangmanSlice = createSlice({
  name: 'hangman',
  initialState: {
    wrongLettersCounter: 0,
    successGamesCounter: 0,
    selectedWord: [] as WordsType[],
  },
  reducers: {
    /* wrong counter */
    addOneWrongCounter: (state) => {
      state.wrongLettersCounter += 1;
    },
    resetWrongCounter: (state) => {
      state.wrongLettersCounter = 0;
    },

    /* success counter */
    addOneSuccesssCounter: (state) => {
      state.successGamesCounter += 1;
    },
    resetSuccesssCounter: (state) => {
      state.successGamesCounter = 0;
    },

    /* selected word */
    setSelectedWord: (state, action: PayloadAction<WordsType[]>) => {
      state.selectedWord = action.payload;
    },
  },
});

export const { addOneWrongCounter, resetWrongCounter, addOneSuccesssCounter, resetSuccesssCounter, setSelectedWord } = hangmanSlice.actions;

export default hangmanSlice.reducer;