import { UpdatedWordType } from '../components/dictionary/types/DictionaryType';
import axiosInstance from './common/axiosInstance';
import { DictionaryKnowledgeType, EnglishLevel, WordsType } from './common/types';

export const fetchFilterDictionary = async (
  levelArray: string[], 
  knowledgeArray: DictionaryKnowledgeType[], 
  token?: string
): Promise<WordsType[]> => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const { data } = await axiosInstance.get('/filter', {
    params: {
      levelArray: JSON.stringify(levelArray),
      knowledgeArray: JSON.stringify(knowledgeArray),
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return data;
};

export const fetchDictionary = async (
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

export const changeWordKnowledge = async (
  updatedWord: UpdatedWordType,
  token: string
) => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const { id, knowledge } = updatedWord;
  const response = await axiosInstance.patch(`dictionary/${id}`, { knowledge }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const addNewWord = async (
  userWord: { foreignWord: string; translatedWord: string },
  token: string
) => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const payload = { foreignWord: userWord.foreignWord, hebrewWord: userWord.translatedWord };
  const response = await axiosInstance.post('/dictionary/new', payload, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};