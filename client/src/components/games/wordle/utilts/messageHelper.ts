import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { GameNameEnum } from "../../../pages/MainPage/common/GamesCards/types/mainPageTypes";
import { useAddNewScore } from "../../requests/addScoreMutate";
import { WORDLE_FINISHED_NUMBER } from "../../common/consts";
import { resetSuccess, setClicks, setCurrentMode } from "../slices/WordleSlice";
import { CurrentMode } from "../ types/WordelType";
import { QueryClient } from "@tanstack/react-query";
import { DICTIONARY_ALL_WORDS, KEYBOARD_LETTERS } from "../../requests/queryKeys";

export const useWordleActions = () => {
  const successCounter = useSelector((state: RootState) => state.wordel.successCounter);
  const currentMode = useSelector((state: RootState) => state.wordel.currentMode);

  const dispatch: AppDispatch = useDispatch();
  const newScore = useAddNewScore(GameNameEnum.Wordle);

  const queryClient = new QueryClient();

  const restartGameFail = async () => {
    dispatch(setCurrentMode(CurrentMode.Loading));
    dispatch(setClicks(WORDLE_FINISHED_NUMBER));
    await queryClient.removeQueries(); 
  };

  const restartGameSuccess = async () => {
    dispatch(setCurrentMode(CurrentMode.Loading));
    dispatch(setClicks(WORDLE_FINISHED_NUMBER));
    await queryClient.removeQueries(); 
  };

  const handleBack = async () => {
    const payload = { score: successCounter};
    newScore.mutate(payload);
    dispatch(setCurrentMode(CurrentMode.Loading));
    dispatch(resetSuccess())
    dispatch(setClicks(WORDLE_FINISHED_NUMBER));
    await queryClient.removeQueries(); 
  };

  return { restartGameFail, handleBack, restartGameSuccess };
};

export default useWordleActions;