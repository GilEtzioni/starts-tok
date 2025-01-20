import { useQuery } from '@tanstack/react-query';
import { fetchUserFlag, fetchAllPoints } from './fetchApi';

export const useFetchUserFlag = () => {
  return useQuery(['mainPage'], fetchUserFlag);
};

export const useFetchPointsData = () => {
  return useQuery(['points'], fetchAllPoints);
};