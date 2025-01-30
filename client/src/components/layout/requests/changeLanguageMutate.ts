import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseLangauge } from '../../../api/common/types';
import { changeLanguage } from '../../../api/layout';
import { useAuth } from '@clerk/clerk-react';

export const useChangeLanguage = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation(
    async (newLanguage: CourseLangauge) => {
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
      return changeLanguage(newLanguage, token); 
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
};