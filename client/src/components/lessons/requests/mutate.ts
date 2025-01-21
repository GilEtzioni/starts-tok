import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchFinishLesson, postNewPoints } from '../../../api/lessons';
import { ADD_NEW_POINTS, FINISHED_LESSON_QUERY_KEY } from './queryKeys';

export const usePatchFinishLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation(patchFinishLesson, {
    onSuccess: () => {
      queryClient.invalidateQueries([FINISHED_LESSON_QUERY_KEY]);
    },
  });
};

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