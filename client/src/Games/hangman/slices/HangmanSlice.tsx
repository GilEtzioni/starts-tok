import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordsType } from "../../../types/types";

export const hangmanSlice = createSlice({
  name: 'hangman',
  initialState: {
    wrongCounter: 0,
    successCounter: 0,
    selectedWord:  [] as WordsType[],
  },

  reducers: {
    /* wrong counter */
    addOneWrongCounter: (state) => {
      state.wrongCounter += 1;
    },
    resetWrongCounter: (state) => {
      state.wrongCounter = 0;
    },

    /* success counter */
    addOneSuccesssCounter: (state) => {
      state.successCounter += 1;
    },
    resetSuccesssCounter: (state) => {
      state.successCounter = 0;
    },

    /* selected word */
    setSelectedWord: (state, action: PayloadAction<WordsType[]>) => {
      state.selectedWord = action.payload;
    },
  },
});

export const { addOneWrongCounter, resetWrongCounter, addOneSuccesssCounter, resetSuccesssCounter, setSelectedWord } = hangmanSlice.actions;

export default hangmanSlice.reducer;