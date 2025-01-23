import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { GameNameEnum } from "../../../pages/MainPage/common/GamesCards/types/mainPageTypes";
import { useAddNewScore } from "../../requests/addScoreMutate";
import { addOneSuccesssCounter, resetSuccesssCounter, setNumberWrongCounter } from "../slices/HangmanSlice";
import { WordsType } from "../../../../api/common/types";
import { HANGMAN_FINISHED_NUMBER } from "../../common/consts";

const useHangmanActions = () => {
  const dispatch: AppDispatch = useDispatch();
  const successCounter = useSelector((state: RootState) => state.hangman.successGamesCounter);
  const newScore = useAddNewScore(GameNameEnum.Hangman);

  // fail handlers
  const restartGameFail = (words: WordsType[]) => {
    dispatch(setNumberWrongCounter(HANGMAN_FINISHED_NUMBER));
    dispatch(resetSuccesssCounter());
  };

  const handleBackFail = () => {
    const payload = { score: successCounter };
    newScore.mutate(payload);
    dispatch(setNumberWrongCounter(HANGMAN_FINISHED_NUMBER));
    dispatch(resetSuccesssCounter());
  };

  // success handlers
  const restartGameSuccess = () => {
    dispatch(setNumberWrongCounter(HANGMAN_FINISHED_NUMBER));
    dispatch(addOneSuccesssCounter());
  };

  const handleBackSuccess = () => {
    const payload = { score: successCounter + 1 };
    newScore.mutate(payload);
    dispatch(setNumberWrongCounter(HANGMAN_FINISHED_NUMBER));
    dispatch(resetSuccesssCounter());
  };

  return { restartGameFail, handleBackFail, restartGameSuccess, handleBackSuccess };
};

export default useHangmanActions;
