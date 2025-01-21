import axiosInstance from "./common/axiosInstance";
import { FirstCardType } from "../components/lessons/types/FirstLessonType";
import { MissingWordType, SenteceType, WordsType } from "./common/types";

export const fetchFirstLessonWords = async (name: string, lesson: string): Promise<FirstCardType[]> => {
  const { data } = await axiosInstance.get(`/main/firstLessonWords/${name}/${lesson}`);
  return data;
};

export const fetchSecondLessonSentence = async (name: string, lesson: string): Promise<SenteceType[]> => {
  const { data } = await axiosInstance.get(`/main/secondLessonSentence/${name}/${lesson}`);
  return data;
};

export const fetchSecondLessonWords = async(name: string, lesson: string): Promise<string[]> => {
  const { data } = await axiosInstance.get(`/main/secondLessonWords/${name}/${lesson}`);
  return data;
};

export const fetchThirdLessonWords = async (name: string, lesson: string): Promise<MissingWordType[]> => {
  const { data } = await axiosInstance.get(`/main/thirdLesson/${name}/${lesson}`);
  return data;
};

export const fetchAllWords = async (): Promise<WordsType[]> => {
  const { data } = await axiosInstance.get('/dictionary');
  return data;
};

export const patchFinishLesson = async ({ name, lesson }: { name: string; lesson: string }) => {
  const response = await axiosInstance.patch(`/main/course/${name}/${lesson}`);
  return response.data;
};

export const postNewPoints = async (userPoints: { newPoints: number }) => {
  const payload = { newPoints: userPoints.newPoints };
  const response = await axiosInstance.post(`/addPoints`, payload);
  return response.data;
};