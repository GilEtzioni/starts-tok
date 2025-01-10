// custom hook
import { useMainLearnHelper } from './MainLearnHelper';

// redux
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";

// lessons components
import MainFirst from "./FirstLesson/MainFirst";
import MainSecond from './SecondLesson/MainSecond';
import MainThird from "./ThirdLesson/MainThird";

// components
import NextButton from "./Messages/NextButton"
import BackButton from '../components/Main/BackButton';
import ProgressBar from './Messages/ProgressBar'; 
import ErrorMessage from './Messages/ErrorMessage';
import SuccessMessage from './Messages/SuccessMessage';

const MainLearn: React.FC = () => {
    const { order, finishLesson, handleFinishLesson, myLesson, myLevel } = useMainLearnHelper();

    const status = useSelector((state: RootState) => state.lessons.status);

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
                finishLesson({ name: myLevel, lesson: myLesson }); // patch
                handleFinishLesson();                              // go to main course page
        }
    };


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


            {status === "failure" && <ErrorMessage />}
    
            {status === "success" && <SuccessMessage />}
           
    
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-[1000]">
                <NextButton />
            </div>
        </>
    );
};

export default MainLearn;