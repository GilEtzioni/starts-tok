import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from "../Main/LessonsSlice";
import dictionaryReducer from "../Dictionarys/DictionarySlice";

export const store = configureStore({
  reducer: {
    lessons: lessonReducer,
    dictionay: dictionaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
