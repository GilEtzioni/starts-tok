import axiosInstance from "./common/axiosInstance";
import { CourseType } from "./common/types";
import { weekPointsType } from "./common/types";
import { FinishedType } from "../components/pages/MainPage/components/CoursesCards/types/courseTypes";
import { GameNameEnum } from "../components/pages/MainPage/components/GamesCards/types/mainPageTypes";

export const fetchCoursesCards = async (name: string): Promise<CourseType[]> => {
    const { data } = await axiosInstance.get(`/main/course/${name}`);
    return data;
};

export const fetchOneDayUser = async (): Promise<weekPointsType[]> => {
    const { data } = await axiosInstance.get('/currentWeekPoints');
    return data;
};
export const fetchLessonPage = async (): Promise<FinishedType[]> => {
    const { data } = await axiosInstance.get('/main/finished');
    return data;
};

export const fetchMaxPoints = async (gameName: GameNameEnum): Promise<any> => {
    const { data } = await axiosInstance.get(`/${gameName}/maxScore`);
    return data;
};

export const fetchWordsCounter = async (): Promise<any> => {
    const { data } = await axiosInstance.get('/finishedWords');
    return data;
};