// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import axiosInstance from '../common/axiosInstance';
// import { CourseLangauge } from '../common/types';
// import { CHANGE_LANGUAGE } from './apiConstants';

// export const useChangeLanguage = () => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     async (newLanguage: CourseLangauge) => {
//         const response = await axiosInstance.patch(CHANGE_LANGUAGE, { newLanguage });
//         return response.data;
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['mainPage']);
//         queryClient.invalidateQueries(['points']);
//         queryClient.invalidateQueries(['dictionary']);
//       },
//     }
//   );
// };