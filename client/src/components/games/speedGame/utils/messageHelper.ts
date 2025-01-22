import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { GameNameEnum } from "../../../pages/MainPage/components/GamesCards/types/mainPageTypes";
import { useAddNewScore } from "../../requests/mutate";
import { resetSuccesssCounter, resetWrongCounter, setNumberWrongCounter } from "../slices/SpeedGameSlice";
import { SPEED_GAME_FINISHED_NUMBER } from "../../common/consts";

const useSpeedGameActions = () => {
  const dispatch: AppDispatch = useDispatch();
  const successCounter = useSelector((state: RootState) => state.speedGame.succcessCounter);
  const newScore = useAddNewScore(GameNameEnum.SpeedGame)

  // fail handlers
  const restartGame = () => {
    const payload = { score: successCounter };
    newScore.mutate(payload);
    dispatch(resetSuccesssCounter());
    dispatch(setNumberWrongCounter(SPEED_GAME_FINISHED_NUMBER));
  };

  const handleBack = () => {
    dispatch(resetSuccesssCounter());
    dispatch(resetWrongCounter());
  };

  return { restartGame, handleBack };
};

export default useSpeedGameActions;