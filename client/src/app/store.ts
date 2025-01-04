import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from "../Lessons/dataLessons/LessonsSlice";
import dictionaryReducer from "../Dictionarys/dataDictionary/DictionarySlice";
import speedGameReducer from "../Games/speedGame/dataSpeedGame/SpeedGameSlice";

export const store = configureStore({
  reducer: {
    lessons: lessonReducer,
    dictionary: dictionaryReducer,
    speedGame: speedGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
