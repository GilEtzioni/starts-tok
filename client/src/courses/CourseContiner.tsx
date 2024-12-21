import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Course.css";

const CourseContainer: React.FC = () => {
  const { name } = useParams<{ name?: string }>();
  const levelName = name ?? 'default-level';

  const [courses, setCourses] = useState<{ id: number; courseNameEnglish: string; courseNameHebrew: string; levelEnglish: string; lessonCompleted: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/main/course/${levelName}`);
        const data = await response.json();
        console.log('Fetched data in React:', data); 
        setCourses(data);
      } catch (error) {
        console.error('error fetching data:', error); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="course-container">
      <div className="course-wrapper">
        {Array.from({ length: Math.ceil(courses.length / 5) }).map((_, rowIndex) => (
          <Row gutter={[24, 24]} justify="center" key={rowIndex} className="course-row" >
            {courses
              .slice(rowIndex * 5, rowIndex * 5 + 5)
              .map((course) => (
                <Col span={4} key={course.id} className="course-col">
                  <Link
                    to={`/main/course/${course.levelEnglish}/${course.courseNameEnglish}/${course.lessonCompleted}`}
                    className="course-link"
                  >
                    <Card title={
                      <div className="course-title">
                        {course.courseNameHebrew}
                      </div>
                      }
                      bordered={true} hoverable={true}  className="course-card"
                    >
                      <div className="course-completion">
                        סיימת {course.lessonCompleted}/6
                      </div>
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