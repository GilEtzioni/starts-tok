import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchFinishLesson } from '../../../api/lessons';
import { FINISHED_LESSON_QUERY_KEY } from './queryKeys';
import { useAuth } from '@clerk/clerk-react';

export const usePatchFinishLesson = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation(
    async ({ name, lesson }: { name: string; lesson: string }) => {
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
      return patchFinishLesson({ name, lesson }, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([FINISHED_LESSON_QUERY_KEY]);
      },
    }
  );
};