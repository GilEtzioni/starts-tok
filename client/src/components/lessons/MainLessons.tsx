import { ReactElement, useEffect, useState } from "react";
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
import { resetOrder, setLessonName, setRunning } from './slices/LessonsSlice';

const MainLearn: React.FC = () => {
    const status = useSelector((state: RootState) => state.lessons.status);
    const randomOrder = useSelector((state: RootState) => state.lessons.randomOrder);
    const order = useSelector((state: RootState) => state.lessons.order);
    const dispatch = useDispatch();

    const [currentLesson, setCurrentLesson] = useState<{ component: ReactElement | null, key: number }>({
        component: null,
        key: 0,
    });
    const randomOrderArray = [1, 2, 3, 4, 5, 6, 7, 8]

    const getLessonComponent = (order: number): ReactElement | null => {
      // Using if/else to check which lesson to return based on order
      if (randomOrderArray.includes(order)) {
        if (order === 1 || order === 2) {
          dispatch(setLessonName(LessonName.MatchPairs));
          return <FirstLesson />;
        }
        if (order === 3 || order === 4) {
          dispatch(setLessonName(LessonName.sentece));
          return <SecondLesson />;
        }
        if (order === 5 || order === 6) {
          dispatch(setLessonName(LessonName.MissingWriting));
          return <ThirdLesson />;
        }
        if (order === 7 || order === 8) {
          dispatch(setLessonName(LessonName.MissingCards));
          return <ForthLesson />;
        }
      }
      
      return null;
    };
    
    useEffect(() => {
        setCurrentLesson(prev => ({
            component: getLessonComponent(randomOrder),
            key: prev.key + 1,
        }));
    }, [randomOrder]);

    const handleBack =  () => {
        dispatch(resetOrder());
        dispatch(setLessonName(LessonName.Loading))
    }

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
      
        <div>{order === 9 ? <FinishLessonMessage /> : <div key={currentLesson.key}>{currentLesson.component}</div>}</div> 

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            {status === LessonStatus.Failure && <FailureMessage />}
            {status === LessonStatus.Success && <SuccessMessage />}
            {status === LessonStatus.Running && <NextButton />}
        </div>
        </>
      );
}      

export default MainLearn;