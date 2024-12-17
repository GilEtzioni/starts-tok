import React from 'react';
import MainLayout from "../Layout/MainLayout";
import CourseContainer from '../courses/CourseContiner';
import { useParams } from 'react-router-dom';

const CoursesPage: React.FC = () => {
    const { name, completed } = useParams<{ name?: string; completed?: string }>(); 

    // Provide default values for params
    const levelName = name ?? 'default-level';         
    const lessonCompleted = completed ?? 'default-completed';

    return (
      <div>
        {/* Fixed prop syntax */}
        <MainLayout 
          levelName={`${levelName}/${lessonCompleted}"`} 
          course_name='' 
          myComponent={<CourseContainer />} 
        />
      </div>
    );
};

export default CoursesPage;
