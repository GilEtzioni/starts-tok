import { useQueryClient, useQuery } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

const USER_FLAG = "/userLanguage"

const fetchAllPoints = async (): Promise<number[]> => {
    const { data } = await axiosInstance.get('/allPoints');
    return data;
  };
  
  export const useFetchPointsData = () => {
    const queryClient = useQueryClient();
  
    const query = useQuery<number[]>({
      queryKey: ['allPoints'],
      queryFn: fetchAllPoints,
      onSuccess: () => {
        queryClient.invalidateQueries(['allPoints']); 
      },
    });
  
    return query;
  };  

/* ---------------------------------------------------------------- */

const fetchUserFlag = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get(USER_FLAG);
  return data;
};

export const useFetchUserFlag = () => {
  const queryClient = useQueryClient();

  const query = useQuery<string[]>({
    queryKey: ['flag'],
    queryFn: fetchUserFlag,
    onSuccess: () => {
      queryClient.invalidateQueries(['flag']); 
    },
  });

  return query;
};  