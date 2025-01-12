import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from "../lessons/slices/LessonsSlice";
import dictionaryReducer from "../dictionary/slices/DictionarySlice";
import WordleSlice from '../games/wordle/slices/WordleSlice';
import speedGameReducer from "../games/speedGame/slices/SpeedGameSlice";
import hangmanReducer from "../games/hangman/slices/HangmanSlice";

export const store = configureStore({
  reducer: {
    lessons: lessonReducer,
    dictionary: dictionaryReducer,
    speedGame: speedGameReducer,
    hangman: hangmanReducer,
    wordel: WordleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;