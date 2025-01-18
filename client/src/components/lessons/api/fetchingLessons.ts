import { useMutation, useQuery, useQueryClient  } from '@tanstack/react-query';
import { LessonType } from "../../../api/common/types";
import { WordsType } from '../../../api/common/types';
import axiosInstance from './axiosInstance';

const fetchLesson = async (name: string, lesson: string): Promise<LessonType[]> => {
  const { data } = await axiosInstance.get(`/main/course/${name}/${lesson}/`);
  return data;
};

export const useFetchLessonData = (name: string, lesson: string) => {
  const queryClient = useQueryClient();

  return useQuery<LessonType[]>({
    queryKey: ['lessonsData', name, lesson],
    queryFn: () => fetchLesson(name, lesson),
    onSuccess: () => {
      queryClient.invalidateQueries(['lessonsData']);
    },
  });
};

/* ------------------------------------------------------------ */

const fetchWordsLessons = async (name: string, lesson: string): Promise<WordsType[]> => {
  const { data } = await axiosInstance.get(`/main/courseWords/${name}/${lesson}/`);
  return data;
};

export const useFetchLessonWords = (name: string, lesson: string) => {
  const queryClient = useQueryClient();

  return useQuery<WordsType[], Error>({
    queryKey: ['lessonsWords', name, lesson] as const,
    queryFn: () => fetchWordsLessons(name, lesson),
  });
};

/* ------------------------------------------------------------ */

const fetchWords = async (): Promise<WordsType[]> => {
  const { data } = await axiosInstance.get('/dictionary');
  return data;
};

export const useFetchWordsData = () => {
  const queryClient = useQueryClient();

  const query = useQuery<WordsType[]>({
    queryKey: ['wordsData'],
    queryFn: fetchWords,
    onSuccess: () => {
      queryClient.invalidateQueries(['wordsData']); 
    },
  });

  return query;
};

/* ------------------------------------------------------------ */

export const usePatchFinishLesson = () => {
  const queryClient = useQueryClient();

  return useMutation(
      async ({ name, lesson }: { name: string; lesson: string }) => {
          const response = await axiosInstance.patch(`/main/course/${name}/${lesson}`);
          return response.data;
      },
      {
          onSuccess: () => {
              queryClient.invalidateQueries(['lessons']);
          },
      }
  );
};