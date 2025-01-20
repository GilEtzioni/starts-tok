import axiosInstance from "../common/axiosInstance";
import { LESSON_PAGE, WEEKLY_POINTS, MAX_POINTS, FINISHED_WORDS, DICTIONARY_COUNTER } from "./apiConstants";
import { CourseType } from "../common/types";
import { weekPointsType } from "../common/types";
import { FinishedType } from "../../components/pages/MainPage/components/CoursesCards/types/courseTypes";

export const fetchCoursesCardsData = async ({ queryKey }: { queryKey: [string, string] }): Promise<CourseType[]> => {
    const [, name] = queryKey; 
    const { data } = await axiosInstance.get(LESSON_PAGE.replace('name', name));
    return data;
};

export const fetchOneDayUserData = async (): Promise<weekPointsType[]> => {
    const { data } = await axiosInstance.get(WEEKLY_POINTS);
    return data;
};
export const fetchLesson = async (): Promise<FinishedType[]> => {
    const { data } = await axiosInstance.get(FINISHED_WORDS);
    return data;
};

export const fetchMaxPoints = async ({ queryKey }: { queryKey: [string, string] }): Promise<any> => {
    const [, gameName] = queryKey;
    const { data } = await axiosInstance.get(MAX_POINTS.replace('gameName', gameName));
    return data;
};

export const fetchWordsCounter = async (): Promise<any> => {
    const { data } = await axiosInstance.get(DICTIONARY_COUNTER);
    return data;
};