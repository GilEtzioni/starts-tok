import { useQuery } from '@tanstack/react-query';
import { fetchCoursesCardsData, fetchOneDayUserData, fetchLesson, fetchMaxPoints, fetchWordsCounter } from './fetchApi';

export const useFetchCoursesCardsData = (name: string) => {
    return useQuery(['lessonPage', name], fetchCoursesCardsData);
};

export const useFetchOneDayUserData = () => {
  return useQuery(['currentWeekPoints'], fetchOneDayUserData);
};

export const useFetchLessonData = () => {
  return useQuery(['courseCards'], fetchLesson);
};

export const useFetchWordsCounter = () => {
  return useQuery(['finishedWordsCounter'], fetchWordsCounter);
};

export const useGameMaxScore = (gameName: string) => {
  return useQuery(['gamesCards', gameName], fetchMaxPoints);
};