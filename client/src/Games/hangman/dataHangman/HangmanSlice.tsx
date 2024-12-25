import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const hangmanSlice = createSlice({
  name: 'hangman',
  initialState: {
    wrongCounter: 0,
  },
  reducers: {
    /* wrong counter */
    addOneWrongCounter: (state) => {
      state.wrongCounter += 1;
    },
    resetWrongCounter: (state) => {
      state.wrongCounter = 0;
    },
  },
});

export const { addOneWrongCounter, resetWrongCounter } = hangmanSlice.actions;

export default hangmanSlice.reducer;
