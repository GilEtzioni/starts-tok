import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewWord } from '../../../api/dictionary';
import { ADD_NEW_WORD } from './queryKeys';
import { useAuth } from '@clerk/clerk-react';

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