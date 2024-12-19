import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const dictionarySlice = createSlice({
  name: 'dictinary',
  initialState: {
    levelFilter: [] as string[],
    knowlageFilter: { 
      isEx: false, 
      isVy: false, 
      isQueistion: false 
    },
    clickFilter: 0,
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
    setExBoolean: (state, action: PayloadAction<boolean>) => {
      state.knowlageFilter.isEx = action.payload;
    },
    setVyBoolean: (state, action: PayloadAction<boolean>) => {
      state.knowlageFilter.isVy = action.payload;
    },
    setQuestionBoolean: (state, action: PayloadAction<boolean>) => {
      state.knowlageFilter.isQueistion = action.payload;
    },
    /* click filter */
    resetClick: (state) => {
      state.clickFilter = 0;
    },

    addOneClick: (state) => {
      state.clickFilter += 1;
    },
  },
});

export const { 
  addLevel, removeLevel, clearLevels, setVyBoolean, setExBoolean, setQuestionBoolean, resetClick, addOneClick
} = dictionarySlice.actions;

export default dictionarySlice.reducer;
