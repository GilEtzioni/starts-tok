import { useQuery, useQueryClient  } from '@tanstack/react-query';
import { FinishedType } from '../components/CoursesCards/types/courseTypes';
import axiosInstance from './axiosInstance';

export const fetchFinishedWordsCounter = async (): Promise<number> => {
  const response = await axiosInstance.get("/finishedWords");
  return response.data; 
};

const fetchLesson = async (): Promise<FinishedType[]> => {
  const { data } = await axiosInstance.get(`/main/finished`);
  return data;
};

export const useFetchLessonData = () => {
  const queryClient = useQueryClient();

  return useQuery<FinishedType[]>({
    queryKey: ['finishedWords'],
    queryFn: () => fetchLesson(),
    onSuccess: () => {
      queryClient.invalidateQueries(['finishedWords']);
    },
  });
};

export const useGameMaxScore = (gameName: string) => {
  return useQuery(
    ['gameMaxScore', gameName],
    async () => {
      const { data } = await axiosInstance.get(`/${gameName}/maxScore`);
      return data;
    },
  );
};