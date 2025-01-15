import { useQueryClient, useQuery } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

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