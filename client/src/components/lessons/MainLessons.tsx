import { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../app/store";

// lessons components
import FirstLesson from "./LessonModules/FirstLesson";
import SecondLesson from './LessonModules/SecondLesson';
import ThirdLesson from './LessonModules/ThirdLesson';
import ForthLesson from "./LessonModules/ForthLesson";

// common
import NextButton from "./common/Assets/NextButton"
import BackButton from '../../common/BackButton';
import ProgressBar from './common/Assets/ProgressBar'; 
import FailureMessage from './common/Messages/FailureMessage';
import SuccessMessage from './common/Messages/SuccessMessage';
import FinishLessonMessage from './common/Messages/FinishLessonMessage';
import { LessonName, LessonStatus } from './types/LessonType';
import { resetClicks, resetOrder, setLessonName, setRunning, startNewTime } from './slices/LessonsSlice';
import { useQueryClient } from "@tanstack/react-query";

const MainLearn: React.FC = () => {
    const { status, randomOrder, order } = useSelector((state: RootState) => state.lessons);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const getLessonComponent = (order: number, randomOrder: number): ReactElement | null => {
      if (order === 9) {
        return <FinishLessonMessage />;
      }
      if (randomOrder === 1 || randomOrder === 2) {
        dispatch(setLessonName(LessonName.MatchPairs));
        return <FirstLesson />;
      }
      if (randomOrder === 3 || randomOrder === 4) {
        dispatch(setLessonName(LessonName.sentece));
        return <SecondLesson />;
      }
      if (randomOrder === 5 || randomOrder === 6) {
        dispatch(setLessonName(LessonName.MissingWriting));
        return <ThirdLesson />;
      }
      if (randomOrder === 7 || randomOrder === 8) {
        dispatch(setLessonName(LessonName.MissingCards));
        return <ForthLesson />;
      }
      return <FinishLessonMessage />;
    }
  
    const handleBack = async () => {
      dispatch(resetOrder())
      dispatch(resetClicks())
      dispatch(setRunning())
    }

    useEffect(() => {
      dispatch(startNewTime())
      queryClient.removeQueries();
    },[])

    return (
        <>
        <div className="flex items-center justify-between mt-5">
            <div className="flex-grow text-center ml-10">
                <ProgressBar num={order} />
            </div>
            <div className='mr-10'>
                <BackButton onBack={handleBack} />
            </div>
        </div>
      
        <div> { getLessonComponent(order, randomOrder) } </div>

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            {status === LessonStatus.Failure && <FailureMessage />}
            {status === LessonStatus.Success && <SuccessMessage />}
            {status === LessonStatus.Running && <NextButton />}
        </div>
        </>
      );
}      

export default MainLearn;