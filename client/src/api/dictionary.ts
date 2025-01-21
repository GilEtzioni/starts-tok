import { UpdatedWordType } from '../components/dictionary/types/DictionaryType';
import axiosInstance from './common/axiosInstance';
import { WordsType } from './common/types';

export const fetchDictionary = async (): Promise<WordsType[]> => {
  const { data } = await axiosInstance.get('/dictionary');
  return data;
};

export const changeWordKnowledge = async (updatedWord: UpdatedWordType) => {
  const { id, knowledge } = updatedWord;
  const response = await axiosInstance.patch(`dictionary/${id}`, { knowledge });
  return response.data;
};

export const addNewWord = async (userWord: { foreignWord: string; translatedWord: string }) => {
  const payload = { foreignWord: userWord.foreignWord, hebrewWord: userWord.translatedWord };
  const response = await axiosInstance.post('/dictionary/new', payload);
  return response.data;
};