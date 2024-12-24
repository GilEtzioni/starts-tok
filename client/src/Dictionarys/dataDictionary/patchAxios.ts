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
      console.log("start useMutation");
      const { id, knowlage } = updatedWord; 
      const response = await axiosInstance.patch(`/dictionary/${id}`, { knowlage });
      console.log("finish useMutation");
      return response.data;
    },
    {
      onSuccess: () => {
        console.log("success");
        queryClient.invalidateQueries(['dictionary']);
      },
      onError: (error) => {
        console.error('Error updating word knowledge:', error);
      },
    }
  );
};

export default usePatchItem;
