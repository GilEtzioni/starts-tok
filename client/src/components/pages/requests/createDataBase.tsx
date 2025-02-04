import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDataBase } from '../../../api/pages';
import { CREATE_DATA_BASE } from './queryKeys';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

export const useCreateDataBase = () => {
    const queryClient = useQueryClient();
    const { getToken } = useAuth();
  
    return useMutation(
      async () => {
        const token = await getToken();
        if (!token) {
          throw new Error("Authentication token is missing.");
        }
        return createDataBase(token);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['CREATE_DATA_BASE']);
        },
      }
    );
  };