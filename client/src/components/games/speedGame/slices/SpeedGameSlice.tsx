import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SPEED_GAME_FINISHED_NUMBER } from '../../common/consts';
import { SpeedGameMode } from '../types/speedGameTypes';

export const hangmanSlice = createSlice({
  name: 'speedGame',
  initialState: {
    wrongCounter: SPEED_GAME_FINISHED_NUMBER,
    succcessCounter: 0,
    speedGameMode: SpeedGameMode.Loading,
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

    /* hangman node */
    setSpeedGameMode: (state, action: PayloadAction<SpeedGameMode>) => {
      state.speedGameMode = action.payload;
    },
  },
});

export const { 
  addOneWrongCounter, 
  resetWrongCounter, 
  addOneSuccesssCounter, 
  resetSuccesssCounter,
  setNumberWrongCounter,
  setSpeedGameMode
} = hangmanSlice.actions;

export default hangmanSlice.reducer;