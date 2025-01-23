import { useMutation, useQueryClient } from '@tanstack/react-query';
import {  postNewPoints } from '../../../api/lessons';
import { ADD_NEW_POINTS } from './queryKeys';

export const useAddNewPoints = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (userPoints: { newPoints: number }) => postNewPoints(userPoints),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ADD_NEW_POINTS]);
      },
    }
  );
};