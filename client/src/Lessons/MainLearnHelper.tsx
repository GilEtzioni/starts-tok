// react
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../app/store";
import { resetOrder } from "./dataLessons/LessonsSlice";

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

    const handleFinishLesson = () => {
        dispatch(resetOrder());
        navigate(`/main/course/${myLevel}`);
    };


    return { order, status, finishLesson, handleFinishLesson, myLesson, myLevel };
};
