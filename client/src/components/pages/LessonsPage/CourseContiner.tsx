import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { useParams, Link } from 'react-router-dom';

// fetch
import { fetchCoursesCards } from '../../../api/pages';
import { useQuery } from '@tanstack/react-query';
import { COURSE_CARD } from '../requests/queryKeys';

// components
import CourseProgressBar from "./common/CourseProgressBar"
import { CourseType } from "../../../api/common/types";
import CourseIcons from "./common/CourseIcons";

const CourseContainer: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const { data: coursesCardsData, isLoading } = useQuery(
    [COURSE_CARD],
    () => fetchCoursesCards(name || ''),
  );

  const { Title } = Typography;

  const cardBackground = (lessonsCompleted: number) =>
    lessonsCompleted !== 0 ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-white' : 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-500';

  const mappedData = 
    coursesCardsData?.map((course: CourseType) => ({
      hebrewLevel: course.hebrewLevel,
      englishLevel: course.englishLevel,
      courseID: course?.courseOrder - coursesCardsData[0]?.courseOrder,
    })) || [];

  if (isLoading) return <div>Loading...</div>;

  if (!coursesCardsData || coursesCardsData.length === 0 || !name) {
    return <div>No available courses</div>;
  }

  return (
    <div className="flex justify-center items-center p-5">
      <div className="max-w-screen-xl w-full">

        <Row justify="center" className="mb-2.5"> 
          <Title level={3} className="text-center"> 
            {mappedData[0]?.englishLevel} - {mappedData[0]?.hebrewLevel}
          </Title>
        </Row>

        {/* card rows */}
        {coursesCardsData.length > 0 ? (
          Array.from({ length: Math.ceil(coursesCardsData.length / 5) }).map(
            (_, rowIndex) => (
              <Row
                style={{ direction: "rtl" }}
                gutter={[24, 24]}
                justify="center"
                key={rowIndex}
                className="mb-6"
              >
                {coursesCardsData
                  .slice(rowIndex * 5, rowIndex * 5 + 5)
                  .map((course: CourseType) => (
                    <Col
                      span={4}
                      key={course?.courseOrder - 1}
                      className="flex justify-center"
                    >
                      <Link
                        to={`/main/course/${course.englishLevel}/${course.courseNameEnglish}`}
                        className="no-underline"
                      >
                        <Card
                          bordered={false}
                          hoverable={true}
                          className={`transition-transform duration-300 transform hover:scale-110 w-40 h-40 relative shadow-md rounded-lg ${cardBackground(
                            course.lessonCompleted
                          )}`}
                        >
                          <p
                            className={`text-center ltr font-semibold ${
                              course.lessonCompleted !== 0
                                ? 'text-white'
                                : 'text-gray-500'
                            }`}
                          >
                            {course.courseNameHebrew}
                          </p>
                          <CourseIcons courseId={course?.courseOrder} />
                          <CourseProgressBar num={course.lessonCompleted} />
                        </Card>
                      </Link>
                    </Col>
                  ))}
              </Row>
            )
          )
        ) : (
          <div>No available courses</div>
        )}
      </div>
    </div>
  );
};

export default CourseContainer;
