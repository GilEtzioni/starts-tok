import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewScore } from '../../../api/games';
import { ADD_GAME_SCORE } from './queryKeys';
import { GameNameEnum } from '../../pages/MainPage/components/GamesCards/types/mainPageTypes';

export const useAddNewScore = (gameName: GameNameEnum) => {
  const queryClient = useQueryClient();

  return useMutation(
    (userNewScore: { score: number }) => addNewScore(gameName, userNewScore),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ADD_GAME_SCORE]);
      },
    }
  );
};