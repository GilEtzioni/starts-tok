import React from 'react';
import MainLayout from "../Layout/MainLayout";
import CourseContainer from '../courses/CourseContiner';
import { useParams } from 'react-router-dom';

const CoursesPage: React.FC = () => {
    const { name, completed } = useParams<{ name?: string; completed?: string }>(); 

    const levelName = name ?? 'default-level';         
    const lessonCompleted = completed ?? 'default-completed';

    return (
      <div>
        <MainLayout 
          levelName={`${levelName}/${lessonCompleted}"`} 
          courseName='' 
          myComponent={<CourseContainer />} 
        />
      </div>
    );
};

export default CoursesPage;
