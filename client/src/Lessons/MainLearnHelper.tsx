// react
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../app/store";
import { resetOrder } from "./slices/LessonsSlice";

// fetch data
import { usePatchFinishLesson } from "./api/fetchingLessons";

export const useMainLearnHelper = () => {

    const { mutate: finishLesson } = usePatchFinishLesson();

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
