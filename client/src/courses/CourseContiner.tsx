import React from 'react';
import { Card, Col, Row, Progress } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './data/axiosInstance';
import { CourseType } from './data/courseTypes';
import CourseIcons from './CourseIcons';

import "../index.css"

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

  return (
    <div className="flex justify-center items-center p-5">
      <div className="max-w-screen-xl w-full">
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

                  {/* icons */}
                  <CourseIcons courseId={course.courseId} />

                  {/* progress Bar */}
                  <Progress
                    percent={(course.lessonCompleted / 6) * 100}
                    showInfo={false}
                    strokeColor="#ffffff"
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/5"
                  />
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
