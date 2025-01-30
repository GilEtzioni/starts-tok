import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewScore } from '../../../api/games';
import { ADD_GAME_SCORE } from './queryKeys';
import { GameNameEnum } from '../../pages/MainPage/common/GamesCards/types/mainPageTypes';
import { useAuth } from '@clerk/clerk-react';

export const useAddNewScore = (gameName: GameNameEnum) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation(
    async (userNewScore: { score: number }) => {
      const token = await getToken(); 
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
      return addNewScore(gameName, userNewScore, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ADD_GAME_SCORE]);
      },
    }
  );
};