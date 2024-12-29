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
import NextButton from "../components/Main/NextButton"
import BackButton from '../components/Main/BackButton';
import ProgressBar from '../components/Main/ProgressBar'; 
import ErrorMessage from '../components/Main/ErrorMessage';
import SuccessMessage from '../components/Main/SuccessMessage';

import "./MainLearn.css";

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
            <div className="header-container">
                <div className="back-button-wrapper">
                    <BackButton />
                </div>
                <div className="progress-bar-wrapper">
                    <ProgressBar num={order} />
                </div>
            </div>
            
            {/* render the current lesson */}
            <div>{renderCurrentLesson()}</div>

            {status === "failure" && <ErrorMessage />}
    
            {status === "success" && <SuccessMessage />}
           
    
            <div className="next-button-container">
                <NextButton />
            </div>
        </>
    );
};

export default MainLearn;