import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../common/axiosInstance';
import { FINISH_LESSON } from './apiConstants';

// finish lessons
export const usePatchFinishLesson = () => {
  const queryClient = useQueryClient();

  return useMutation(
      async ({ name, lesson }: { name: string; lesson: string }) => {
        //   const { data } = await axiosInstance.get(THIRD_LESSON.replace('name', name).replace('lesson', lesson));
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

/* ------------------------------------------------------------ */

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
        queryClient.invalidateQueries(['points']);
      },
    }
  );
};