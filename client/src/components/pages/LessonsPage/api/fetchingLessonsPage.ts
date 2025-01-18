import axiosInstance from './axiosInstance';
import { useQuery, useQueryClient  } from '@tanstack/react-query';
import { CourseType } from "../../../../api/common/types";

const fetchCoursesCardsData = async (name: string): Promise<CourseType[]> => {
  const { data } = await axiosInstance.get(`/main/course/${name}`);
  return data;
};

export const useFetchCoursesCardsData = (name: string) => {
  const queryClient = useQueryClient();

  return useQuery<CourseType[]>({
    queryKey: ['coursesCardsData', name], 
    queryFn: () => fetchCoursesCardsData(name),
    onSuccess: () => {
      queryClient.invalidateQueries(['coursesCardsData']);
    },
  });
};