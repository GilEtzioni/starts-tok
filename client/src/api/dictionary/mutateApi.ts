import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../common/axiosInstance';
import { DICTIONARY, NEW_WORD } from './apiConstants';
import { UpdatedWordType } from '../../components/dictionary/types/DictionaryType';

/* ----------------------------------------------------------------- */

export const useChangeWordKnowledge = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedWord: UpdatedWordType) => {
      const { id, knowledge } = updatedWord;
      const response = await axiosInstance.patch(`${DICTIONARY}/${id}`, { knowledge });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dictionary']);
      },
    }
  );
};

/* ----------------------------------------------------------------- */

export const useAddNewWord = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (userWord: { foreignWord: string; translatedWord: string }) => {
      const payload = { foreignWord: userWord.foreignWord, hebrewWord: userWord.translatedWord };
      const response = await axiosInstance.post(NEW_WORD, payload);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['dictionary']);
      },
    }
  );
};