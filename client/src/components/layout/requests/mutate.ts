import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseLangauge } from '../../../api/common/types';
import { changeLanguage } from '../../../api/layout';

export const useChangeLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (newLanguage: CourseLangauge) => changeLanguage(newLanguage),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
};