import React, { useState } from 'react';
import NextButton from '../components/Main/NextButton';
import ProgressBar from '../components/Main/ProgressBar';
import BackButton from '../components/Main/BackButton';
import ErrorMessage from "./Lessons/ErrorMessage";

import { GlobalClickedProvider } from './Lessons/GlobalClickedContext';
import LessonOneFront from './Lessons/LessonOne/LessonOneFront';
import LessonTwoFront from "./Lessons/LessonTwo/LessonTwoFront";
import LessonThreeFront from './Lessons/LessonThree/LessonThreeFront';

const MainLearn: React.FC = () => {
    const [currentId, setCurrentId] = useState<number>(1);
    const [num, setNum] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    // Render the current lesson based on currentId
    const renderCurrentLesson = () => {
        switch (currentId) {
            case 1: return ( <LessonOneFront setFinished={setFinished} setError={setError} order={"first"} /> );
            case 2: return ( <LessonTwoFront setFinished={setFinished} setError={setError} order={"second"} /> );
            case 3: return ( <LessonThreeFront setFinished={setFinished} setError={setError} order={"third"} /> );
            case 4: return ( <LessonOneFront setFinished={setFinished} setError={setError} order={"forth"} /> );
            case 5: return ( <LessonTwoFront setFinished={setFinished} setError={setError} order={"fifth"} /> );
            case 6: return ( <LessonThreeFront setFinished={setFinished} setError={setError} order={"sith"} />);
            default:
                return <div>No lesson found.</div>;
        }
    };

    // Handle progress bar updates
    const handleProgress = () => {
        setNum((prevNum) => Math.min(prevNum + 1, 5));
    };

    return (
        <GlobalClickedProvider>
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

                <div>{renderCurrentLesson()}</div>

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
                        setError={setError}
                        setFinished={setFinished}
                        error={error}
                        finished={finished}
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                        onClick={handleProgress}
                    />
                </div>
            </div>
        </GlobalClickedProvider>
    );
};

export default MainLearn;
