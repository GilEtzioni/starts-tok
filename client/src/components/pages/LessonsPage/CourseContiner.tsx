import React from 'react';
import { Card, Col, Row, Typography, Grid } from 'antd';
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
  const { Title, Paragraph } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const withAuth = useWithAuth();
  const course = () => withAuth((token) => fetchCoursesCards(name ?? "", token));

  const { data: coursesCardsData, isLoading } = useQuery([COURSE_CARD], course);

  const mappedData =
    coursesCardsData?.map((course: CourseType) => ({
      hebrewLevel: course.hebrewLevel,
      englishLevel: course.englishLevel,
      courseID: course.courseOrder - coursesCardsData[0]?.courseOrder,
    })) || [];
  
    const isMobile = !screens.md;

    const PC_GRID_LENGTH = 5;
    const PHONE_GRID_WIDTH = 3;
    const PHONE_GRID_HEIGHT = 8;
    const GRID_WIDTH = isMobile ? PHONE_GRID_WIDTH : PC_GRID_LENGTH;
    const GRID_HEIGHT = isMobile ? PHONE_GRID_HEIGHT : PC_GRID_LENGTH;

    const cardSize = isMobile ? "w-24 h-24" : "w-40 h-40";

return (
  <div className={`flex justify-center items-center ${isMobile ? "px-2" : "p-5"}`}>
    <div className={isMobile ? "max-w-screen-sm w-full" : "max-w-screen-xl w-full"}>
      <Row justify="center" className="mb-2.5">
        <Title level={3} className="text-center">
          {mappedData[0]?.englishLevel} - {mappedData[0]?.hebrewLevel}
        </Title>
      </Row>

      {isLoading ? (
        <SkeletonCards />
      ) : (
        Array.from({ length: Math.ceil(GRID_HEIGHT) }).map((_, rowIndex) => (
          <Row
            dir="rtl"
            gutter={[isMobile ? 0 : 24, 24]}
            justify="center"
            key={rowIndex}
            className="mb-6"
          >
            {coursesCardsData
              ?.slice(rowIndex * GRID_WIDTH, rowIndex * GRID_WIDTH + GRID_WIDTH)
              .map((course: CourseType) => (
                <Col span={isMobile ? 8 : 4} key={course.courseOrder - 1} className="flex justify-center">
                  <Link to={`/main/course/${course.englishLevel}/${course.courseNameEnglish}`} className="no-underline">
                  <Card
                    bordered={false}
                    hoverable
                    className={classNames(
                      "transition-transform duration-300 transform relative shadow-md rounded-lg",
                      course.lessonCompleted !== 0
                        ? "bg-gradient-to-r from-lime-400 to-emerald-400 text-white"
                        : "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-500",
                      isMobile
                        ? `hover:scale-105 ${cardSize} flex flex-col justify-center items-center p-2`
                        : "hover:scale-110 w-40 h-40"
                    )}
                  >

                      <Paragraph
                        className={classNames(
                          "text-center ltr",
                          {
                            "text-white": course.lessonCompleted !== 0,
                            "text-gray-500": course.lessonCompleted === 0,
                            "font-semibold": !isMobile,
                            "absolute top-1 left-1/2 transform -translate-x-1/2 mt-2 text-xs w-full": isMobile
                          },
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
          ))
        )}
      </div>
    </div>
  );
};

export default CourseContainer;