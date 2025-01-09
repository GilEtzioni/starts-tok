import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from "../Lessons/dataLessons/LessonsSlice";
import dictionaryReducer from "../Dictionarys/dataDictionary/DictionarySlice";
import WordleSlice from '../Games/wordle/slices/WordleSlice';
import speedGameReducer from "../Games/speedGame/dataSpeedGame/SpeedGameSlice";
import hangmanReducer from "../Games/hangman/dataHangman/HangmanSlice";

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
