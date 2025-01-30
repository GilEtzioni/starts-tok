import { WordsType } from "./common/types";
import axiosInstance from './common/axiosInstance';
import { GameNameEnum } from "../components/pages/MainPage/common/GamesCards/types/mainPageTypes";

export const fetchWords = async (
  token?: string
): Promise<WordsType[]> => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const { data } = await axiosInstance.get('/dictionary', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return data;
};

export const fetchKeyboard = async (
  token?: string
): Promise<string[]> => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const { data } = await axiosInstance.get('/keyboard', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return data;
};

export const addNewScore = async (
  gameName: GameNameEnum, userNewScore: { score: number },
  token: string
) => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axiosInstance.post(`/${gameName}/score`, userNewScore, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};