import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordsType } from '../../../Dictionarys/types/wordType';

export const hangmanSlice = createSlice({
  name: 'hangman',
  initialState: {
    wrongCounter: 0,
    succcessCounter: 0,
    selectedWord:  [] as Array<WordsType>,
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
      state.succcessCounter += 1;
    },
    resetSuccesssCounter: (state) => {
      state.succcessCounter = 0;
    },

    /* selected word */
    setSelectedWord: (state, action: PayloadAction<Array<WordsType>>) => {
      state.selectedWord = action.payload;
    },
  },
});

export const { addOneWrongCounter, resetWrongCounter, addOneSuccesssCounter, resetSuccesssCounter, setSelectedWord } = hangmanSlice.actions;

export default hangmanSlice.reducer;