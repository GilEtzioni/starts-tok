// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../app/store";

// lessons components
import MainFirst from "./FirstLesson/MainFirst";
import MainSecond from './SecondLesson/MainSecond';
import MainThird from './ThirdLesson/MainThird';

// common
import NextButton from "./common/NextButton"
import BackButton from "./common/BackButton";
import ProgressBar from './common/ProgressBar'; 
import FailureMessage from './common/FailureMessage';
import SuccessMessage from './common/SuccessMessage';
import FinishLessonMessage from './common/FinishLessonMessage';
import { LessonStatus } from './types/LessonType';
import { useEffect } from 'react';
import { addOnePoint } from './slices/LessonsSlice';

const MainLearn: React.FC = () => {

    const status = useSelector((state: RootState) => state.lessons.status);
    const order = useSelector((state: RootState) => state.lessons.order);
    const dispatch = useDispatch();

    const renderCurrentLesson = () => {
        switch (order) {
            case 1:
                return <MainFirst />;
            case 2: 
                return <MainSecond />;
            case 3:
                return <MainThird />;
            case 4:
                return <MainFirst />;
            case 5: 
                return <MainSecond />;                
            case 6:
                return <MainThird />;
            default:
                return <FinishLessonMessage />
        }
    };

    // count success
    useEffect(() => {
        if(status === LessonStatus.Success) {
            dispatch(addOnePoint());
        }
    },[status]);

    return (
        <>
            <div className="flex items-center justify-between my-5 gap-5">
                <div className="ml-5">
                    <BackButton />
                </div>
                <div className="flex-grow">
                    <ProgressBar num={order} />
                </div>
            </div>
    
            <div>{renderCurrentLesson()}</div>

            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            {status === LessonStatus.Failure && <FailureMessage />}
            {status === LessonStatus.Success && <SuccessMessage />}
            {status === LessonStatus.Running && <NextButton />}
            </div>
    
        </>
    );
}    

export default MainLearn;