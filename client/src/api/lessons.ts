import axiosInstance from "./common/axiosInstance";
import { FirstLesson } from "../components/lessons/types/FirstLessonType";
import { MissingWordType, SenteceType, WordsType } from "./common/types";

export const fetchFirstLesson = async (lesson: string): Promise<FirstLesson> => {
  const { data } = await axiosInstance.get(`/main/firstLesson/${lesson}`);
  return data;
};

export const fetchSecondLesson = async (lesson: string): Promise<SenteceType> => {
  const { data } = await axiosInstance.get(`/main/secondLesson/${lesson}`);
  return data;
};

export const fetchThirdLesson = async (lesson: string): Promise<MissingWordType> => {
  const { data } = await axiosInstance.get(`/main/thirdLesson/${lesson}`);
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