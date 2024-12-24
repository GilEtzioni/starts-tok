// react
import React from 'react';

// custom hook
import { useMainLearnHelper } from './MainLearnHelper';

// lessons components
import MainFirst from "./FirstLesson/MainFirst";
import MainSecond from './SecondLesson/MainSecond';
import MainThird from "./ThirdLesson/MainThird";

// components
import NextButton from '../components/Main/NextButton';
import ProgressBar from '../components/Main/ProgressBar';
import BackButton from '../components/Main/BackButton';
import ErrorMessage from "./Components/ErrorMessage";
import "./MainLearn.css";

const MainLearn: React.FC = () => {
    const { order, showError, finishLesson, handleFinishLesson, myLesson, myLevel } = useMainLearnHelper();

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

    const errorMessageDisplay = (
        <div>
            <ErrorMessage />
        </div>
    );

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
    
            {showError && errorMessageDisplay}
    
            <div className="next-button-container">
                <NextButton />
            </div>
        </>
    );
};

export default MainLearn;