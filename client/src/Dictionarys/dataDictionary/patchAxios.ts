import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export interface UpdatedWord {
  id: number; 
  knowlage: string;
}

const usePatchItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedWord: UpdatedWord) => {
      const { id, knowlage } = updatedWord; 
      const response = await axiosInstance.patch(`/dictionary/${id}`, { knowlage });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dictionary']);
      },
      onError: (error) => {
        throw error;
      },
    }
  );
};

export default usePatchItem;

// usePatchNewItem