import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export interface UpdatedWord {
  id: number; 
  knowlage: string;
}

export interface AddNewWord {
  germanWord: string; 
  translatedWord: string;
}

export const usePatchItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedWord: UpdatedWord) => {
      const { id, knowlage } = updatedWord; 
      const response = await axiosInstance.patch(`/dictionary/${id}`, { knowlage });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dictionary']);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};



export const usePatchNewItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (userWord: { germanWord: string; translatedWord: string }) => {
      const payload = { GermanWord: userWord.germanWord, HebrewWord: userWord.translatedWord };
      const response = await axiosInstance.post(`/dictionary/new`, payload);
      return response.data; 
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['dictionaryNew']); 
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};
