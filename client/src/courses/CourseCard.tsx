import React from 'react';
import { Card, Col, Row } from 'antd';

const CourseCard: React.FC = () => {
  const gridItems = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    title: `Card ${index + 1}`,
    content: `Content for card ${index + 1}`,
  }));

  return (
    <div>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <Row gutter={[16, 32]} key={rowIndex}>
          {gridItems.slice(rowIndex * 5, rowIndex * 5 + 5).map((item) => (
            <Col span={4} key={item.id}>
              <Card title={item.title} bordered={false}>
                {item.content}
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default CourseCard;
