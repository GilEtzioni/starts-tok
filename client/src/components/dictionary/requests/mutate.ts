import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdatedWordType } from '../types/DictionaryType';
import { changeWordKnowledge, addNewWord } from '../../../api/dictionary';
import { CHANGE_WORD_KNOWLEDGE, ADD_NEW_WORD } from './queryKeys';
import { useAuth } from '@clerk/clerk-react';

export const useChangeWordKnowledge = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation(
    async (updatedWord: UpdatedWordType) => {
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
      return changeWordKnowledge(updatedWord, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([CHANGE_WORD_KNOWLEDGE]);
      },
    }
  );
};

export const useAddNewWord = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation(
    async (userWord: { foreignWord: string; translatedWord: string }) => {
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
      return addNewWord(userWord, token); 
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ADD_NEW_WORD]);
      },
    }
  );
};