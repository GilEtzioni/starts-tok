import { ALL_WORDS } from "./apiConstants";
import { WordsType } from "../common/types";
import axiosInstance from '../common/axiosInstance';

export const fetchWords = async (): Promise<WordsType[]> => {
  const { data } = await axiosInstance.get(ALL_WORDS);
  return data;
};