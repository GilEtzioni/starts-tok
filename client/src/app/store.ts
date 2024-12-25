import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from "../Lessons/LessonsSlice";
import dictionaryReducer from "../Dictionarys/dataDictionary/DictionarySlice";
import hangmanReducer from "../Games/hangman/dataHangman/HangmanSlice";

export const store = configureStore({
  reducer: {
    lessons: lessonReducer,
    dictionay: dictionaryReducer,
    hangman: hangmanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
