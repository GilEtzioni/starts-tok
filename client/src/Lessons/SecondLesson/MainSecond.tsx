import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../dataLessons/axiosInstance";
import { LessonType } from '../types/lessonType';
import SecondCardContainer from './SecondCardContainer';


const MainSecond: React.FC = () => {

    const { name, lesson } = useParams<{ name?: string; lesson?: string; }>();

    const fetchItems = async (name?: string, lesson?: string, ): Promise<LessonType[]> => {
        const { data } = await axiosInstance.get(`/main/course/${name ?? 'default-level'}/${lesson ?? 'default-completed'}`);
        return data;
    };

    const { data: lessonsData = [], isLoading, error } = useQuery(
        ['lessonsData', name, lesson],
        () => fetchItems(name, lesson)
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;

    return (
        <div>
           <SecondCardContainer lessonsData={lessonsData} /> 
        </div>
    );
};

export default MainSecond;
