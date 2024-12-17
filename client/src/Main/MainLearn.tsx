import React, { useEffect, useState } from 'react';
import NextButton from '../components/Main/NextButton';
import ProgressBar from '../components/Main/ProgressBar';
import BackButton from '../components/Main/BackButton';
import ErrorMessage from "./Lessons/ErrorMessage";

import { useSelector } from 'react-redux';
import { RootState } from "../app/store";

import LessonOneFront from './Lessons/LessonOne/LessonOneFront';
import LessonTwoFront from "./Lessons/LessonTwo/LessonTwoFront";
import LessonThreeFront from './Lessons/LessonThree/LessonThreeFront';

const MainLearn: React.FC = () => {
    const status = useSelector((state: RootState) => state.lessons.status);
    const order = useSelector((state: RootState) => state.lessons.order);
    
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        if (status === "failure") {
            setShowError(true);
        } else {
            setShowError(false);
        }
    }, [status]);

    const renderCurrentLesson = () => {
        switch (order) {
            case 1:
                return <LessonOneFront />;
            case 2: 
                return <LessonTwoFront />;
            case 3:
                return <LessonThreeFront />;
            case 4:
                return <LessonOneFront />;
            case 5: 
                return <LessonTwoFront />;                
            case 6:
                return <LessonThreeFront />;
        
            default:
                // patch new level soon...
                return <div> finished lesson 1/6 </div>;
        }
    };

    const styleOneTwo = { marginBottom: "10px", textAlign: "center" } as React.CSSProperties;
    const styleThree = { marginTop: "10px", textAlign: "center" } as React.CSSProperties;
    
    const errorMessageDisplay = (
        <div style={order === 3 || order === 6 ? styleOneTwo : styleThree}>
            <ErrorMessage />
        </div>
    );

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0",
                    gap: "20px",
                }}
            >
                <div style={{ marginLeft: "20px" }}>
                    <BackButton />
                </div>
                <div style={{ flexGrow: 1 }}>
                    <ProgressBar num={order} />
                </div>
            </div>

            {/* render the current lesson */}
            <div>{renderCurrentLesson()}</div>

            {showError && errorMessageDisplay}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "150px",
                }}
            >
                <NextButton />
            </div>
        </div>
    );
};

export default MainLearn;
