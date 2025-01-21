import axiosInstance from "./common/axiosInstance";
import { CourseLangauge } from "./common/types";

export const fetchUserFlag = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get('/userLanguage');
  return data;
  };
  
export const fetchAllPoints = async (): Promise<{ points: string; userName: string }> => {
  const { data } = await axiosInstance.get('/allPoints');
  return data;
};

export const changeLanguage = async (newLanguage: CourseLangauge) => {
  const response = await axiosInstance.patch('/changeLanguage', { newLanguage });
  return response.data;
};