import { useQuery } from '@tanstack/react-query';
import { fetchLessonWords, fetchSentence, fetchWordsContainer, fetchThirdLesson, fetchAllWords } from './fetchApi';

export const useFetchLessonWords = (name: string, lesson: string) => {
  return useQuery(['first', name, lesson], fetchLessonWords);
};

export const useFetchSentence = (name: string, lesson: string) => {
  return useQuery(['sentence', name, lesson], fetchSentence);
};

export const useFetchWordsContainer = (name: string, lesson: string) => {
  return useQuery(['second', name, lesson], fetchWordsContainer);
};

export const useFetchThirdLesson = (name: string, lesson: string) => {
  return useQuery(['missing', name, lesson], fetchThirdLesson);
};

export const useFetchAllWords = () => {
  return useQuery(['allWords'], fetchAllWords);
};