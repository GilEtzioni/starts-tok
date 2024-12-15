import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NextButton from '../components/Main/NextButton';
import ProgressBar from '../components/Main/ProgressBar';
import BackButton from '../components/Main/BackButton';
import ErrorMessage from "./Lessons/ErrorMessage";
import {fetchCourseData} from "./Lessons/MainClass";

// import LessonOneFront from './Lessons/LessonOne/LessonOneFront';
import LessonTwoFront from './Lessons/LessonTwo/LessonTwoFront';

const MainLearn: React.FC = () => {
    const [currentId, setCurrentId] = useState<number>(1);
    const [num, setNum] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleProgress = () => {
        setNum((prevNum) => Math.min(prevNum + 1, 5));
    };

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
                    <ProgressBar num={num} />
                </div>
            </div>

            {/* 
            <LessonOneFront
                finished={finished}
                setFinished={setFinished}
                error={error}
                setError={setError}
            />
            */}
            
            
            <LessonTwoFront 
            />
            

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center", 
                    height: "150px", 
                }}
            >
                {error && (
                    <div style={{ marginBottom: "10px", textAlign: "center" }}>
                        <ErrorMessage />
                    </div>
                )}

                <NextButton
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    onClick={handleProgress}
                />
            </div>
        </div>
    );
};

export default MainLearn;
