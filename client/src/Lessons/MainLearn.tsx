// react
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../app/store";
import { resetOrder  } from "./LessonsSlice";

// lessosns components
import MainFirst from "./FirstLesson/MainFirst";
import MainSecond from './SecondLesson/MainSecond';
import MainThird from "./ThirdLesson/MainThird";

// components
import NextButton from '../components/Main/NextButton';
import ProgressBar from '../components/Main/ProgressBar';
import BackButton from '../components/Main/BackButton';
import ErrorMessage from "./Components/ErrorMessage";
import "./MainLearn.css"


const MainLearn: React.FC = () => {
    // params
    const dispatch = useDispatch();
    const { name} = useParams<{ name?: string; lesson?: string; completed?: string }>(); 
    const myLevel = name ?? 'default-level';         

    // react nav (go back)
    const navigate = useNavigate();

    // redux
    const status = useSelector((state: RootState) => state.lessons.status);
    const order = useSelector((state: RootState) => state.lessons.order);
    
    // show failure 
    const [showError, setShowError] = useState<boolean>(false);

    const handleFinishLesson = () => {
        dispatch(resetOrder());
        navigate(`/main/course/${myLevel}`);
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
                return <MainThird/>;
        
            default:
                handleFinishLesson();
        }
    }


    
    const errorMessageDisplay = (
        <div >
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
}

export default MainLearn;