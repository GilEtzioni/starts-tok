import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';

// fetch
import { fetchCoursesCards } from '../../../api/pages';
import { useQuery } from '@tanstack/react-query';
import { COURSE_CARD } from '../requests/queryKeys';

// components
import SkeletonCards from './common/SkeletonCards';
import CourseProgressBar from "./common/CourseProgressBar"
import { CourseType } from "../../../api/common/types";
import CourseIcons from "./common/CourseIcons";
import { useWithAuth } from '../../../api/common/withAuth';

const CourseContainer: React.FC = () => {
  const { name } = useParams<{ name?: string }>();
  const { Title } = Typography;
  const { Paragraph } = Typography;

  const withAuth = useWithAuth();
  const course = () => withAuth((token) => fetchCoursesCards(name ?? "", token));

  const { data: coursesCardsData, isLoading, isError } = useQuery(
    [COURSE_CARD],
    course);

  const mappedData =
    coursesCardsData?.map((course: CourseType) => ({
      hebrewLevel: course.hebrewLevel,
      englishLevel: course.englishLevel,
      courseID: course.courseOrder - coursesCardsData[0]?.courseOrder,
    })) || [];

  const GRID_LENGTH = 5;

  return (
    <div className="flex justify-center items-center p-5">
      <div className="max-w-screen-xl w-full">
        <Row justify="center" className="mb-2.5">
          <Title level={3} className="text-center">
           {mappedData[0]?.englishLevel} - {mappedData[0]?.hebrewLevel}
          </Title>
        </Row>

        {isLoading ? 
        <SkeletonCards />
        : ( Array.from({ length: Math.ceil(GRID_LENGTH) }).map(
            (_, rowIndex) => (
              <Row
              style={{ direction: "rtl" }}
                gutter={[24, 24]}
                justify="center"
                key={rowIndex}
                className="mb-6"
              >
                {coursesCardsData
                  ?.slice(rowIndex * GRID_LENGTH, rowIndex * GRID_LENGTH + GRID_LENGTH)
                  .map((course: CourseType) => (
                    <Col
                      span={4}
                      key={course.courseOrder - 1}
                      className="flex justify-center"
                    >
                      <Link
                        to={`/main/course/${course.englishLevel}/${course.courseNameEnglish}`}
                        className="no-underline"
                      >
                        <Card
                          bordered={false}
                          hoverable
                          className={classNames(
                            'transition-transform duration-300 transform hover:scale-110 w-40 h-40 relative shadow-md rounded-lg',
                            {
                              'bg-gradient-to-r from-lime-400 to-emerald-400 text-white': course.lessonCompleted !== 0,
                              'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-500': course.lessonCompleted === 0,
                            })}
                        >
                          <Paragraph
                          className={classNames(
                            'text-center ltr font-semibold',
                            {
                              'text-white': course.lessonCompleted !== 0,
                              'text-gray-500': course.lessonCompleted === 0,
                            }
                          )}
                          >
                            {course.courseNameHebrew}
                          </Paragraph>
                          <CourseIcons courseId={course.courseOrder} />
                          <CourseProgressBar num={course.lessonCompleted} />
                        </Card>
                      </Link>
                    </Col>
                  ))}
              </Row>
            )
          )
        )}
      </div>
    </div>
  );
};

export default CourseContainer;