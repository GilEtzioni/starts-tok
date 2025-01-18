import { useMutation, useQueryClient  } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const useAddNewPoints = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (userPoints: { newPoints: number }) => {
      const payload = { newPoints: userPoints.newPoints };
      const response = await axiosInstance.post(`/addPoints`, payload);
      return response.data; 
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['addPoints']);
      },
    }
  );
};