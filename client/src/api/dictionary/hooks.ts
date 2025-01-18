import { useQuery } from '@tanstack/react-query';
import { fetchDictionary } from './fetchApi';

export const useFetchDictionaryData = () => {
  return useQuery(['dictionary'], fetchDictionary);
};