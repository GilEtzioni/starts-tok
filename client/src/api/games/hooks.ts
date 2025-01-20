import { useQuery } from '@tanstack/react-query';
import { fetchWords } from './fetchApi';

export const useFetchWordsData = () => {
  return useQuery(['gameWords'], fetchWords);
};