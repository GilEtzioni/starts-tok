import { useMutation, useQuery, useQueryClient  } from '@tanstack/react-query';
import { MissingWordType, SenteceType } from "../../../api/common/types";
import { WordsType } from '../../../api/common/types';
import axiosInstance from './axiosInstance';
import { FirstCardType } from '../types/FirstLessonType';

const FIRST_LESSON = '/main/firstLessonWords/${name}/${lesson}/'
const SECOND_LESSON_SENTENCE = '/main/secondLessonSentence/${name}/${lesson}/'
const SECOND_LESSON_WORDS = '/main/secondLessonWords/${name}/${lesson}/'
const THIRD_LESSON = '/main/thirdLesson/${name}/${lesson}/'

/* ------------------------------------------------------------ */

// first lesson data

const fetchLessonWords = async ({ queryKey }: { queryKey: [string, string, string] }): Promise<FirstCardType[]> => {
  const [, name, lesson] = queryKey; 
  const { data } = await axiosInstance.get(FIRST_LESSON.replace('${name}', name).replace('${lesson}', lesson));
  return data;
};

export const useFetchLessonWords = (name: string, lesson: string) => {
  return useQuery(['first', name, lesson], fetchLessonWords);
};


/* ------------------------------------------------------------ */

// second lesson data

const fetchSentence = async ({ queryKey }: { queryKey: [string, string, string] }): Promise<SenteceType[]> => {
  const [, name, lesson] = queryKey; 
  const { data } = await axiosInstance.get(SECOND_LESSON_SENTENCE.replace('${name}', name).replace('${lesson}', lesson));
  return data;
};

export const useFetchSentence = (name: string, lesson: string) => {
  return useQuery(['sentence', name, lesson], fetchSentence);
};

const fetchWordsContainer = async ({ queryKey }: { queryKey: [string, string, string] }): Promise<string[]> => {
  const [, name, lesson] = queryKey; 
  const { data } = await axiosInstance.get(SECOND_LESSON_WORDS.replace('${name}', name).replace('${lesson}', lesson));
  return data;
};

export const useFetchWordsContainer = (name: string, lesson: string) => {
  return useQuery(['first', name, lesson], fetchWordsContainer);
};

/* ------------------------------------------------------------ */

// third lesson data

const fetchThirdLesson = async ({ queryKey }: { queryKey: [string, string, string] }): Promise<MissingWordType[]> => {
  const [, name, lesson] = queryKey; 
  const { data } = await axiosInstance.get(THIRD_LESSON.replace('${name}', name).replace('${lesson}', lesson));
  return data;
};

export const useFetchThirdLesson = (name: string, lesson: string) => {
  return useQuery(['missing', name, lesson], fetchThirdLesson);
};

/* ------------------------------------------------------------ */

// finish lessons
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

/* ------------------------------------------------------------ */

// words for translate array

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
