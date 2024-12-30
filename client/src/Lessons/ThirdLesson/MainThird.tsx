import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../dataLessons/axiosInstance";
import { LessonType, WordsType } from '../types/lessonType';
import ThirdCardContainer from "./ThirdCardContainer";


const MainThird: React.FC = () => {
    const { name, lesson } = useParams<{ name?: string; lesson?: string; }>();

    // lessons data
    const fetchLessons = async (name?: string, lesson?: string): Promise<LessonType[]> => {
        const { data } = await axiosInstance.get(`/main/course/${name ?? 'default-level'}/${lesson ?? 'default-completed'}`);
        return data;
    };

    const {
        data: lessonsData = [],
        isLoading: lessonsLoading,
        error: lessonsError,
    } = useQuery(['lessonsData', name, lesson], () => fetchLessons(name, lesson));

    // words data
    const fetchWords = async (): Promise<WordsType[]> => {
        const { data } = await axiosInstance.get(`/dictionary`);
        return data;
    };

    const {
        data: wordsData = [],
        isLoading: wordsLoading,
        error: wordsError,
    } = useQuery(['wordsData'], fetchWords);

    if (lessonsLoading || wordsLoading) return <div>Loading...</div>;
    if (lessonsError || wordsError)
        return (
            <div>
                Error: {lessonsError instanceof Error ? lessonsError.message : 'Unknown error'} <br />
                {wordsError instanceof Error ? wordsError.message : ''}
            </div>
        );

    return (
        <div>
            <ThirdCardContainer wordsData={wordsData} lessonsData={lessonsData} />
        </div>
    );
};

export default MainThird;
