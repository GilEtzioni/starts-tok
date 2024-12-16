import React from 'react';
import MainLayout from "../Layout/MainLayout";
import CourseContainer from '../courses/CourseContiner';
import { useParams } from 'react-router-dom';

const CoursesPage: React.FC = () => {
    const { name } = useParams<{ name?: string }>(); 
    const levelName = name ?? 'default-level';       // default value 

  return (
    <div>
      <MainLayout levelName={levelName} course_name='' myComponent={<CourseContainer />} />
    </div>
  );
};

export default CoursesPage;
