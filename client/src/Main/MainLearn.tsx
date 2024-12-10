import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NextButton from '../components/Main/NextButton';
import ProgressBar from '../components/Main/ProgressBar';
import BackButton from '../components/Main/BackButton';
import MainClass from './Lessons/MainClass';


const MainLearn: React.FC = () => {
    const [currentId, setCurrentId] = useState(1); 
    const [num, setNum] = useState(0); 

    const { lesson } = useParams<{ lesson?: string }>();
    const courseLesson = lesson || 'default-lesson';

    const handleProgress = () => {
        setNum((prevNum) => Math.min(prevNum + 1, 5)); 
    };

    return (
        <div>
            {/* Flex container for Back Button and Progress Bar */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0",
                    gap: "20px", // Add spacing between components
                }}
            >
                <div style={{ marginLeft: "20px" }}>
                    {/* Move BackButton to the right */}
                    <BackButton />
                </div>
                <div style={{ flexGrow: 1 }}>
                    {/* Ensure ProgressBar takes up available space */}
                    <ProgressBar num={num} />
                    {/* <MainClass /> */}
                </div>
            </div>

            {/* Next Button */}
            <NextButton
                currentId={currentId}
                setCurrentId={setCurrentId}
                onClick={handleProgress}
            />

            {/* Course ID from URL */}
            {courseLesson !== undefined && <p> lesson name: {courseLesson}</p>}
        </div>
    );
};

export default MainLearn;
