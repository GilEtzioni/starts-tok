import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { GameNameEnum } from "../../../pages/MainPage/common/GamesCards/types/mainPageTypes";
import { useAddNewScore } from "../../requests/addScoreMutate";
import { WordsType } from "../../../../api/common/types";
import { WORDLE_FINISHED_NUMBER } from "../../common/consts";
import { resetClicks, resetSuccess, setClicks, setCurrentMode } from "../slices/WordleSlice";
import { shuffleAllWords } from "./wordleHelper";
import { CurrentMode } from "../ types/WordelType";

export const useWordleActions = () => {
  const successCounter = useSelector((state: RootState) => state.wordel.successCounter);
  const dispatch: AppDispatch = useDispatch();
  const newScore = useAddNewScore(GameNameEnum.Wordle);

  // fail handlers
  const restartGameFail = () => {
    dispatch(setCurrentMode(CurrentMode.Running));
    dispatch(setClicks(WORDLE_FINISHED_NUMBER));
  };

  const handleBackFail = () => {
    const payload = { score: successCounter};
    newScore.mutate(payload);
    dispatch(setCurrentMode(CurrentMode.Running));
    dispatch(resetSuccess());
    dispatch(setClicks(WORDLE_FINISHED_NUMBER));
  };

  // success handlers
  const restartGameSuccess = () => {
    dispatch(setCurrentMode(CurrentMode.Running));
    dispatch(setClicks(WORDLE_FINISHED_NUMBER));
  };

  const handleBackSuccess = () => {
    const payload = { score: successCounter};
    newScore.mutate(payload);
    dispatch(setCurrentMode(CurrentMode.Running));
    dispatch(resetSuccess());
    dispatch(setClicks(WORDLE_FINISHED_NUMBER));
  };

  return { restartGameFail, handleBackFail, restartGameSuccess, handleBackSuccess };
};

export default useWordleActions;