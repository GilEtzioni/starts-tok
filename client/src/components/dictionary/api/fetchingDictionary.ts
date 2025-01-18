import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { WordsType } from '../../../types/types'; 
import axiosInstance from './axiosInstance';
import { UpdatedWordType } from '../types/DictionaryType';

const fetchWords = async (): Promise<WordsType[]> => {
    const { data } = await axiosInstance.get('/dictionary');
    return data;
  };
  
  export const useFetchWordsData = () => {
    const queryClient = useQueryClient();
  
    const query = useQuery<WordsType[]>({
      queryKey: ['dictionary'],
      queryFn: fetchWords,
      onSuccess: () => {
        queryClient.invalidateQueries(['dictionary']); 
      },
    });
  
    return query;
  };
  
  /* --------------------------------------------- */
  
  export const useChangeWordKnowledge= () => {
    const queryClient = useQueryClient();

    return useMutation(
      async (updatedWord: UpdatedWordType) => {
        const { id, knowledge } = updatedWord; 
        const response = await axiosInstance.patch(`/dictionary/${id}`, { knowledge });
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
  
  /* --------------------------------------------- */
  
  export const useAddNewWord = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      async (userWord: { germanWord: string; translatedWord: string }) => {
        const payload = { germanWord: userWord.germanWord, hebrewWord: userWord.translatedWord };
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