import React from 'react';
import { Card, Skeleton, Row, Col } from 'antd';

const SkeletonCards: React.FC = () => {

  const { Avatar } = Skeleton;
  const { Input } = Skeleton;

  return (
    <>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <Row
          style={{ direction: "rtl" }}
          gutter={[24, 24]}
          justify="center"
          key={rowIndex}
          className="mb-6"
        >
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <Col
              span={4}
              key={colIndex}
              className="flex justify-center"
            >
              <Card
                bordered={false}
                hoverable={false}
                className="transition-transform duration-300 transform w-40 h-40 relative shadow-md rounded-lg"
              >
                <div className="flex flex-col items-center justify-between h-full gap-3">
                  <Input active style={{ width: '80%' }} />
                  <Avatar active size="large" shape="circle" />
                  <Input active style={{ width: '60%' }} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

export default SkeletonCards;