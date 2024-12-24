// react + antd
import { Card, Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Course.css";

// fetch
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "./data/axiosInstance";
import { CourseType } from "./data/courseTypes";

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
  if (error) return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;

  return (
    <div className="course-container">
      <div className="course-wrapper">
        {Array.from({ length: Math.ceil(coursesData.length / 5) }).map((_, rowIndex) => (
          <Row gutter={[24, 24]} justify="center" key={rowIndex} className="course-row">
            {coursesData
              .slice(rowIndex * 5, rowIndex * 5 + 5)
              .map((course: CourseType) => (
                <Col span={4} key={course.courseId} className="course-col">
                  <Link
                    to={`/main/course/${course.levelEnglish}/${course.courseNameEnglish}`}
                    className="course-link"
                  >
                    <Card
                      title={<div className="course-title">{course.courseNameHebrew}</div>}
                      bordered={true}
                      hoverable={true}
                      className="course-card"
                    >
                      <div className="course-completion">סיימת {course.lessonCompleted}/6</div>
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
