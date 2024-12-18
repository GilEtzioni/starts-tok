import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const dictionarySlice = createSlice({
  name: 'dictinary',
  initialState: {
    levelFilter: [] as string[],
    knowlageFilter: "",
  },

  reducers: {
    /* level filter */
    addLevel: (state, action: PayloadAction<string>) => {
      state.levelFilter.push(action.payload);
    },
    removeLevel: (state, action: PayloadAction<string>) => {
      state.levelFilter = state.levelFilter.filter(word => word !== action.payload);
    },
    clearLevels: (state) => {
      state.levelFilter = [];
    },

    /* knowlage filter */
    setVy: (state) => {
      state.knowlageFilter = "vy";
    },

    setEx: (state) => {
      state.knowlageFilter = "ex";
    },

    setQuestionMark: (state) => {
      state.knowlageFilter = "questionMark";
    },

    resetKnowlage: (state) => {
      state.knowlageFilter = "";
    },
  },
});

export const { 
  addLevel, removeLevel, clearLevels, setVy, setEx, setQuestionMark, resetKnowlage
} = dictionarySlice.actions;

export default dictionarySlice.reducer;
