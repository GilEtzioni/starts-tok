// react + fetch
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchLessons } from "../dataLessons/DataLessons";
import FirstCardContainer from './FirstCardContainer';

const FirstFront: React.FC = () => {
    const { name, lesson, completed } = useParams<{ name?: string; lesson?: string; completed?: string }>();

    const levelName = name ?? 'default-level';
    const lessonName = lesson ?? 'default-completed';
    const completedLessonsNumber = completed ? parseInt(completed, 10) : 1;

    const { data: lessons, isLoading, error } = useFetchLessons(levelName, lessonName, completedLessonsNumber);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;


    return  <>
    {lessons && <FirstCardContainer lessons={lessons} />}
    </>;
};

export default FirstFront;
