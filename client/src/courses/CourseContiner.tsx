import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { useParams } from 'react-router-dom';

const CourseContainer: React.FC = () => {
  const { name } = useParams<{ name?: string }>();
  const levelName = name ?? 'default-level';

  const [courses, setCourses] = useState<{ id: number; courseName: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/main/course/${levelName}`);
        const data = await response.json();
        console.log('Fetched data in React:', data); // console log the fetched data
        setCourses(data);
      } catch (error) {
        console.error('Error fetching data in React:', error); // log errors
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        {Array.from({ length: Math.ceil(courses.length / 5) }).map((_, rowIndex) => (
          <Row
            gutter={[24, 24]}
            justify="center"
            key={rowIndex}
            style={{ marginBottom: '24px' }}
          >
            {courses
              .slice(rowIndex * 5, rowIndex * 5 + 5)
              .map((course) => (
                <Col span={4} key={course.id}>
                  <Card
                    title={course.courseName}
                    bordered={true}
                    style={{
                      border: '1px solid hsl(240, 5%, 64.9%)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      background: '#fff',
                    }}
                  >
                    סיימת 0/6
                  </Card>
                </Col>
              ))}
          </Row>
        ))}
      </div>
    </div>
  );
};

export default CourseContainer;
