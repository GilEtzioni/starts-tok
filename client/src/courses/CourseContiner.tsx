import React from 'react';
import { Card, Col, Row } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './data/axiosInstance';
import { CourseType } from './data/courseTypes';
import CourseIcons from './CourseIcons';

import "../index.css"
import CourseProgressBar from './CourseProgressBar';

const CourseContainer: React.FC = () => {
  const { name } = useParams<{ name?: string }>();
  const levelName = name ?? 'default-level';

  const fetchItems = async (): Promise<CourseType[]> => {
    const { data } = await axiosInstance.get(`/main/course/${levelName}`);
    return data;
  };

  const { data: coursesData = [], isLoading, error } = useQuery(
    ['coursesData', name],
    fetchItems
  );

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );

  const cardBackground = (lessonsCompleted: number) =>
    lessonsCompleted !== 0 ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-500';

  const levelHebrew = coursesData[0].levelHebrew;
  const levelEnglish = coursesData[0].levelEnglish;
  

  return (
    <div className="flex justify-center items-center p-5">
      <div className="max-w-screen-xl w-full">
      <div className="flex justify-center items-center space-x-4 mb-6">
      <h1 className="text-xl">{levelEnglish}</h1>
      <h1 className="text-xl"> - </h1>
      <h1 className="text-xl">קורס {levelHebrew} </h1>
    </div>
        {Array.from({ length: Math.ceil(coursesData.length / 5) }).map((_, rowIndex) => (
          <Row gutter={[24, 24]} justify="center" key={rowIndex} className="mb-6" >
            {coursesData
              .slice(rowIndex * 5, rowIndex * 5 + 5)
              .map((course: CourseType) => (
                <Col span={4} key={course.courseId} className="flex justify-center" >
                  <Link
                    to={`/main/course/${course.levelEnglish}/${course.courseNameEnglish}`}
                    className="no-underline"
                  >
                <Card
                  bordered={false}
                  hoverable={true}
                  className={`transition-transform duration-300 w-40 h-40 relative shadow-md rounded-lg ${cardBackground(
                    course.lessonCompleted
                  )}`}
                >
                  {/* title */}
                  <p
                    className={`text-center ltr font-semibold ${
                      course.lessonCompleted !== 0 ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {course.courseNameHebrew}
                  </p>

                  <CourseIcons courseId={course.courseId} />
                  <CourseProgressBar num={course.lessonCompleted} />
                </Card>
                  </Link>
                </Col>
              ))}
          </Row>
        ))}
      </div>
    </div>
  );
};

export default CourseContainer;
