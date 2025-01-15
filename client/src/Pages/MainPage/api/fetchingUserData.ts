import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const useFetchOneDayUserData = () => {
    return useQuery(
      ['currentWeekPoints'],
      async () => {
        const { data } = await axiosInstance.get(`/currentWeekPoints`);
        return data;
      },
    );
  };
