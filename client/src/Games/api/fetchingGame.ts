import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { WordsType } from "../../types/types";
import axiosInstance from './axiosInstance';

const fetchWords = async (): Promise<WordsType[]> => {
    const { data } = await axiosInstance.get('/gameWords');
    return data;
  };
  
  export const useFetchWordsData = () => {
    const queryClient = useQueryClient();
  
    const query = useQuery<WordsType[]>({
      queryKey: ['gameWords'],
      queryFn: fetchWords,
      onSuccess: () => {
        queryClient.invalidateQueries(['gameWords']); 
      },
    });
  
    return query;
  };