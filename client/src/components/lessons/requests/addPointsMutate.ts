import { useMutation, useQueryClient } from '@tanstack/react-query';
import {  postNewPoints } from '../../../api/lessons';
import { ADD_NEW_POINTS } from './queryKeys';
import { useAuth } from '@clerk/clerk-react';

export const useAddNewPoints = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation(
    async (userPoints: { newPoints: number }) => {
      const token = await getToken(); 
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
      return postNewPoints(userPoints, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ADD_NEW_POINTS]);
      },
    }
  );
};