import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

// e.g. /main/course/A1/Greeting/
export const usePatchLessons = () => {
  const queryClient = useQueryClient();

  return useMutation(
      async ({ name, lesson }: { name: string; lesson: string }) => {
          console.log("start useMutation");
          const response = await axiosInstance.patch(`/main/course/${name}/${lesson}`);
          console.log("finish useMutation");
          return response.data;
      },
      {
          onSuccess: () => {
              console.log("success");
              queryClient.invalidateQueries(['lessons']);
          },
          onError: (error) => {
              console.error('Error updating lessons:', error);
          },
      }
  );
};

