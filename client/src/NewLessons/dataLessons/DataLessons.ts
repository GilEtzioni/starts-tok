import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';
import { LessonType } from '../types/lessonType';

export const useFetchLessons = (levelName: string, lessonName: string, completedLessonsNumber: number) => {
    const fetchItems = async (): Promise<LessonType[]> => {
        if (!levelName || !lessonName || isNaN(completedLessonsNumber)) {
            throw new Error('Missing or invalid required parameters');
        }

        const { data } = await axiosInstance.get<LessonType[]>(`/main/course/${levelName}/${lessonName}/${completedLessonsNumber}`);
        return data;
    };

    const isEnabled = !!(levelName && lessonName && !isNaN(completedLessonsNumber));

    return useQuery(['lessons', levelName, lessonName, completedLessonsNumber], fetchItems, { enabled: isEnabled });
};
