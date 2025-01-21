import { WordsType } from "./common/types";
import axiosInstance from './common/axiosInstance';
import { GameNameEnum } from "../components/pages/MainPage/components/GamesCards/types/mainPageTypes";

export const fetchWords = async (): Promise<WordsType[]> => {
  const { data } = await axiosInstance.get('/dictionary');
  return data;
};

export const addNewScore = async (gameName: GameNameEnum, userNewScore: { score: number }) => {
  const response = await axiosInstance.post(`/${gameName}/score`, userNewScore);
  return response.data;
};