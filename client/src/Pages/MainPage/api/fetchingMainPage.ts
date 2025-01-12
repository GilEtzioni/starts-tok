import { useQuery, useQueryClient  } from '@tanstack/react-query';
import { FinishedType } from '../components/CoursesCards/types/courseTypes';
import { hangmanScoreType } from '../components/GamesCards/types/mainPageTypes';
import axiosInstance from './axiosInstance';

const fetchLesson = async (): Promise<FinishedType[]> => {
  const { data } = await axiosInstance.get(`/main/finished`);
  return data;
};

export const useFetchLessonData = () => {
  const queryClient = useQueryClient();

  return useQuery<FinishedType[]>({
    queryKey: ['finishedLessons'],
    queryFn: () => fetchLesson(),
    onSuccess: () => {
      queryClient.invalidateQueries(['finishedLessons']);
    },
  });
};

export const useHangmanMaxScore = () => {
    return useQuery(
      ['hangmanScore'],
      async () => {
        const { data } = await axiosInstance.get('/hangman/maxScore');
        return data;
      }
    );
  };