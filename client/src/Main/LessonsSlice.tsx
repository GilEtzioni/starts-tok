import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    status: "running",
    order: 1,
    clicks: 0,
  },

  reducers: {
    /* status */
    setRunning: (state) => {
      state.status = "running";
    },

    setSuccess: (state) => {
      state.status = "success";
    },

    setFailure: (state) => {
      state.status = "failure";
    },

    /* order */
    resetOrder: (state) => {
      state.order = 1;
    },

    addOneOrder: (state) => {
      state.order += 1;
    },

    changeOrder: (state, action: PayloadAction<number>) => {
        state.order = action.payload;
      },

    /* clicks */
    resetClicks: (state) => {
      state.clicks = 0;
    },

    addOneClick: (state) => {
      state.clicks += 1;
    },
  },
});

export const { 
  setRunning, 
  setSuccess, 
  setFailure, 
  resetOrder, 
  addOneOrder, 
  changeOrder, 
  resetClicks, 
  addOneClick 
} = lessonsSlice.actions;

export default lessonsSlice.reducer;
