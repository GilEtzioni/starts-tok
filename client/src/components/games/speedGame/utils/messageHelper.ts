import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { GameNameEnum } from "../../../pages/MainPage/common/GamesCards/types/mainPageTypes";
import { useAddNewScore } from "../../requests/addScoreMutate";
import { resetSuccesssCounter, resetWrongCounter, setNumberWrongCounter, setSpeedGameMode } from "../slices/SpeedGameSlice";
import { SpeedGameMode } from "../types/speedGameTypes";

const useSpeedGameActions = () => {
  const dispatch: AppDispatch = useDispatch();
  const successCounter = useSelector((state: RootState) => state.speedGame.succcessCounter);
  const newScore = useAddNewScore(GameNameEnum.SpeedGame)

  // fail handlers
  const restartGame = () => {
    const payload = { score: successCounter };
    newScore.mutate(payload);
    dispatch(resetSuccesssCounter());
    dispatch(resetSuccesssCounter());
    dispatch(resetWrongCounter());
    dispatch(setSpeedGameMode(SpeedGameMode.Loading))
  };

  const handleBack = () => {
    const payload = { score: successCounter };
    newScore.mutate(payload);
    dispatch(resetSuccesssCounter());
    dispatch(resetSuccesssCounter());
    dispatch(resetWrongCounter());
    dispatch(setSpeedGameMode(SpeedGameMode.Loading))
  };

  return { restartGame, handleBack };
};

export default useSpeedGameActions;