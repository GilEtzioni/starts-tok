// react
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../app/store";
import { resetOrder } from "./LessonsSlice";

// fetch data
import { usePatchLessons } from "./dataLessons/patchAxios";

export const useMainLearnHelper = () => {

    const { mutate: finishLesson } = usePatchLessons();
    const dispatch = useDispatch();
    const { name, lesson } = useParams<{ name?: string; lesson?: string; }>(); 

    const myLesson = lesson ?? 'default-lesson';  
    const myLevel = name ?? 'default-level';         
    const navigate = useNavigate();

    const status = useSelector((state: RootState) => state.lessons.status);
    const order = useSelector((state: RootState) => state.lessons.order);
    
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

    return { order, status, showError, finishLesson, handleFinishLesson, myLesson, myLevel };
};
