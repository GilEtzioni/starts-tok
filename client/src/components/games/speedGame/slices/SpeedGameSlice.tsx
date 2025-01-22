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
    setNumberWrongCounter: (state, action: PayloadAction<number>) => {
      state.wrongCounter = action.payload;
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

export const { 
  addOneWrongCounter, 
  resetWrongCounter, 
  addOneSuccesssCounter, 
  resetSuccesssCounter,
  setNumberWrongCounter
} = hangmanSlice.actions;

export default hangmanSlice.reducer;