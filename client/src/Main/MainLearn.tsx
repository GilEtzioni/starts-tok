import React, { useEffect, useState } from 'react';
import NextButton from '../components/Main/NextButton';
import ProgressBar from '../components/Main/ProgressBar';
import BackButton from '../components/Main/BackButton';
import ErrorMessage from "./Lessons/ErrorMessage";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../app/store";
import { resetOrder  } from "./LessonsSlice";

import LessonOneFront from './Lessons/LessonOne/LessonOneFront';
import LessonTwoFront from "./Lessons/LessonTwo/LessonTwoFront";
import LessonThreeFront from './Lessons/LessonThree/LessonThreeFront';
import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';



const MainLearn: React.FC = () => {
    // params
    const dispatch = useDispatch();
    const { name, lesson, completed } = useParams<{ name?: string; lesson?: string; completed?: string }>(); 

    const levelName = name ?? 'default-level';         
    const courseName = lesson ?? 'default-completed';
    const completedLessons = completed ? parseInt(completed, 10) : 1;
    console.log("levelName", levelName);
    console.log("courseName", courseName);
    console.log("completedLessons", completedLessons);


    // react nav (go back)
    const navigate = useNavigate();

    // redux
    const status = useSelector((state: RootState) => state.lessons.status);
    const order = useSelector((state: RootState) => state.lessons.order);
    
    // show failure 
    const [showError, setShowError] = useState<boolean>(false);

    const handleFinishLesson = () => {
        dispatch(resetOrder());
        navigate(`/main/course/${levelName}`);
    };

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
                return <LessonOneFront levelName={levelName} courseName={courseName} completedLessons={completedLessons}/>;
            case 2: 
                return <LessonTwoFront levelName={levelName} courseName={courseName} completedLessons={completedLessons}/>;
            case 3:
                return <LessonThreeFront levelName={levelName} courseName={courseName} completedLessons={completedLessons}/>;
            case 4:
                return <LessonOneFront levelName={levelName} courseName={courseName} completedLessons={completedLessons} />;
            case 5: 
                return <LessonTwoFront levelName={levelName} courseName={courseName} completedLessons={completedLessons}/>;                
            case 6:
                return <LessonThreeFront levelName={levelName} courseName={courseName} completedLessons={completedLessons}/>;
        
            default:
                handleFinishLesson();
        }
    }


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
