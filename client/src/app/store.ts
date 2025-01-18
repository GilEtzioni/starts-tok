import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from "../components/lessons/slices/LessonsSlice";
import dictionaryReducer from "../components/dictionary/slices/DictionarySlice";
import WordleSlice from '../components/games/wordle/slices/WordleSlice';
import speedGameReducer from "../components/games/speedGame/slices/SpeedGameSlice";
import hangmanReducer from "../components/games/hangman/slices/HangmanSlice";

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