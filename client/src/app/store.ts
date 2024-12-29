import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from "../Lessons/dataLessons/LessonsSlice";
import dictionaryReducer from "../Dictionarys/dataDictionary/DictionarySlice";

export const store = configureStore({
  reducer: {
    lessons: lessonReducer,
    dictionary: dictionaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
