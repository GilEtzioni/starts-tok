import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { GameNameEnum } from "../../../pages/MainPage/common/GamesCards/types/mainPageTypes";
import { useAddNewScore } from "../../requests/addScoreMutate";
import { addOneSuccesssCounter, resetSuccesssCounter, setNumberWrongCounter } from "../slices/HangmanSlice";
import { WordsType } from "../../../../api/common/types";
import { HANGMAN_FINISHED_NUMBER } from "../../common/consts";
import { useQueryClient } from "@tanstack/react-query";

const useHangmanActions = () => {
  const dispatch: AppDispatch = useDispatch();
  const successCounter = useSelector((state: RootState) => state.hangman.successGamesCounter);
  const newScore = useAddNewScore(GameNameEnum.Hangman);
  const queryClient = useQueryClient();

  const restartGameFail = async (words: WordsType[]) => {
    await queryClient.removeQueries(); 
    dispatch(setNumberWrongCounter(HANGMAN_FINISHED_NUMBER));
    dispatch(resetSuccesssCounter());
  };

  const restartGameSuccess = async () => {
    await queryClient.removeQueries(); 
    dispatch(setNumberWrongCounter(HANGMAN_FINISHED_NUMBER));
    dispatch(addOneSuccesssCounter());
  };

  const handleBack = async () => {
    await queryClient.removeQueries(); 
    const payload = { score: successCounter + 1 };
    newScore.mutate(payload);
    dispatch(setNumberWrongCounter(HANGMAN_FINISHED_NUMBER));
    dispatch(resetSuccesssCounter());
  };

  return { restartGameFail, handleBack, restartGameSuccess };
};

export default useHangmanActions;