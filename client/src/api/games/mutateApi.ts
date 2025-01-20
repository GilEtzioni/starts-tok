import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FINISHED_GAME } from './apiConstants';
import axiosInstance from '../common/axiosInstance';

export const useAddNewScore = (gameName: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (userNewScore: { score: number }) => {
      const response = await axiosInstance.post(
        FINISHED_GAME.replace('gameName', gameName),
        userNewScore 
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['gameWords']);
      },
    }
  );
};