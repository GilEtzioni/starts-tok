import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchFinishLesson } from '../../../api/lessons';
import { FINISHED_LESSON_QUERY_KEY } from './queryKeys';

export const usePatchFinishLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation(patchFinishLesson, {
    onSuccess: () => {
      queryClient.invalidateQueries([FINISHED_LESSON_QUERY_KEY]);
    },
  });
};
