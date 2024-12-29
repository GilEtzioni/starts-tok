import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const usePatchLessons = () => {
  const queryClient = useQueryClient();

  return useMutation(
      async ({ name, lesson }: { name: string; lesson: string }) => {
          const response = await axiosInstance.patch(`/main/course/${name}/${lesson}`);
          return response.data;
      },
      {
          onSuccess: () => {
              queryClient.invalidateQueries(['lessons']);
          },
      }
  );
};

