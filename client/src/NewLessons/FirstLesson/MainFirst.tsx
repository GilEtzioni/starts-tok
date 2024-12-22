import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../dataLessons/axiosInstance";
import { LessonType } from '../types/lessonType';
import FirstCardContainer from './FirstCardContainer';


interface MainLearnProps {
    myLevel: string;
    myCourse: string;
    myCompleted: number;
}

const FirstFront: React.FC <MainLearnProps>= ({ myLevel,myCourse ,myCompleted  }) => {

    const { name, lesson, completed } = useParams<{ name?: string; lesson?: string; completed?: string }>();

    const fetchItems = async (name?: string, lesson?: string, completed?: string): Promise<LessonType[]> => {
        const { data } = await axiosInstance.get(`/main/course/${name ?? 'default-level'}/${lesson ?? 'default-completed'}/${completed ? parseInt(completed, 10) : 1}`);
        return data;
    };

    const { data: lessons = [], isLoading, error } = useQuery(
        ['lessons', name, lesson, completed],
        () => fetchItems(name, lesson, completed)
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;

    return (
        <div>
            <FirstCardContainer lessons={lessons} />
        </div>
    );
};

export default FirstFront;
