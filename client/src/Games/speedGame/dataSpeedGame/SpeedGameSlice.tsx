import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const hangmanSlice = createSlice({
  name: 'speedGame',
  initialState: {
    wrongCounter: 0,
    succcessCounter: 0,
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
  },
});

export const { addOneWrongCounter, resetWrongCounter, addOneSuccesssCounter, resetSuccesssCounter } = hangmanSlice.actions;

export default hangmanSlice.reducer;