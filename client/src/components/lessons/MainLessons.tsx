import { ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../app/store";

// lessons components
import MainFirst from "./FirstLesson/MainFirst";
import MainSecond from './SecondLesson/MainSecond';
import MainThird from './ThirdLesson/MainThird';

// common
import NextButton from "./common/NextButton"
import BackButton from '../../common/BackButton';
import ProgressBar from './common/ProgressBar'; 
import FailureMessage from './common/FailureMessage';
import SuccessMessage from './common/SuccessMessage';
import FinishLessonMessage from './common/FinishLessonMessage';
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

    const getLessonComponent = (order: number): ReactElement | null => {
        switch (order) {
            case 1:
            case 4:
                dispatch(setLessonName(LessonName.MatchPairs));
                return <MainFirst />;
            case 2:
            case 5:
                dispatch(setLessonName(LessonName.ForeignMissing));
                return <MainThird />;
            case 3:
            case 6:
                dispatch(setLessonName(LessonName.ForeignMissing));
                return <MainThird />;
            default:
                return null;
        }
    };

    useEffect(() => {
        setCurrentLesson(prev => ({
            component: getLessonComponent(randomOrder),
            key: prev.key + 1,
        }));
    }, [randomOrder, dispatch]);

    const handleBack = () => {
        dispatch(resetOrder());
        dispatch(setRunning());
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
      
        <div>{order === 7 ? <FinishLessonMessage /> : <div key={currentLesson.key}>{currentLesson.component}</div>}</div> 

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            {status === LessonStatus.Failure && <FailureMessage />}
            {status === LessonStatus.Success && <SuccessMessage />}
            {status === LessonStatus.Running && <NextButton />}
        </div>
        </>
      );
}      

export default MainLearn;