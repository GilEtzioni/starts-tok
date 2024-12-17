import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from "../Main/LessonsSlice";

export const store = configureStore({
  reducer: {
    lessons: lessonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
