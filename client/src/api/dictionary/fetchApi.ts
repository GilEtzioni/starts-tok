import axiosInstance from '../common/axiosInstance';
import { DICTIONARY } from "./apiConstants";
import { WordsType } from '../common/types';

export const fetchDictionary = async (): Promise<WordsType[]> => {
  const { data } = await axiosInstance.get(DICTIONARY);
  return data;
};