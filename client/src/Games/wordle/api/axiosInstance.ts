import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { WordsType } from '../../../Dictionarys/types/wordType';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', // ROOT URL
  withCredentials: true,
});

// fetch function
const fetchWords = async (): Promise<WordsType[]> => {
  const { data } = await axiosInstance.get('/wordle');
  return data;
};

// custom hook - fetching word data
export const useFetchWordsData = () => {
  const queryClient = useQueryClient();

  const query = useQuery<WordsType[]>({
    queryKey: ['wordle'],
    queryFn: fetchWords,
    onSuccess: () => {
      queryClient.invalidateQueries(['wordle']); 
    },
  });

  return query;
};

export default axiosInstance;