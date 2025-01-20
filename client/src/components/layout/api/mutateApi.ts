import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';
import { CourseLangauge } from '../../../api/common/types';

const CHANGE_LANGUAGE = "/changeLanguage";

export const useChangeLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newLanguage: CourseLangauge) => {
        const response = await axiosInstance.patch(CHANGE_LANGUAGE, { newLanguage });
        return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userLanguage']);
      },
    }
  );
};