import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../dataLessons/axiosInstance";
import { LessonType } from '../types/lessonType';
import FirstCardContainer from './FirstCardContainer';

const FirstFront: React.FC= () => {

    const { name, lesson, completed } = useParams<{ name?: string; lesson?: string; completed?: string }>();

    const fetchItems = async (name?: string, lesson?: string, completed?: string): Promise<LessonType[]> => {
        const { data } = await axiosInstance.get(`/main/course/${name ?? 'default-level'}/${lesson ?? 'default-completed'}/${completed ? parseInt(completed, 10) : 1}`);
        return data;
    };

    const { data: lessonsData = [], isLoading, error } = useQuery(
        ['lessonsData', name, lesson, completed],
        () => fetchItems(name, lesson, completed)
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;

    return (
        <div style={{ padding: '0 10%'}}>
            <FirstCardContainer lessonsData={lessonsData} />
        </div>
    );
};

export default FirstFront;
