import axiosInstance from "../common/axiosInstance";
import { FIRST_LESSON, SECOND_LESSON_SENTENCE, SECOND_LESSON_WORDS, THIRD_LESSON, ALL_WORDS } from "./apiConstants";
import { FirstCardType } from "../../components/lessons/types/FirstLessonType";
import { MissingWordType, SenteceType, WordsType } from "../common/types";

/* ------------------------------------------------------------ */

// first lesson data
export const fetchLessonWords = async ({ queryKey }: { queryKey: [string, string, string] }): Promise<FirstCardType[]> => {
  const [, name, lesson] = queryKey; 
  const { data } = await axiosInstance.get(FIRST_LESSON.replace('name', name).replace('lesson', lesson));
  return data;
};

/* ------------------------------------------------------------ */

// second lesson data
export const fetchSentence = async ({ queryKey }: { queryKey: [string, string, string] }): Promise<SenteceType[]> => {
  const [, name, lesson] = queryKey; 
  const { data } = await axiosInstance.get(SECOND_LESSON_SENTENCE.replace('name', name).replace('lesson', lesson));
  return data;
};

export const fetchWordsContainer = async ({ queryKey }: { queryKey: [string, string, string] }): Promise<string[]> => {
  const [, name, lesson] = queryKey; 
  const { data } = await axiosInstance.get(SECOND_LESSON_WORDS.replace('name', name).replace('lesson', lesson));
  return data;
};

/* ------------------------------------------------------------ */

// third lesson data
export const fetchThirdLesson = async ({ queryKey }: { queryKey: [string, string, string] }): Promise<MissingWordType[]> => {
  const [, name, lesson] = queryKey; 
  const { data } = await axiosInstance.get(THIRD_LESSON.replace('name', name).replace('lesson', lesson));
  return data;
};

/* ------------------------------------------------------------ */

// words for translate array
export const fetchAllWords = async (): Promise<WordsType[]> => {
  const { data } = await axiosInstance.get(ALL_WORDS);
  return data;
};