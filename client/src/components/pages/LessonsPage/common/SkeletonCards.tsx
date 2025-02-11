import React from 'react';
import { Card, Skeleton, Row, Col, Grid } from 'antd';
import classNames from 'classnames';

const SkeletonCards: React.FC = () => {
  const { Avatar, Input } = Skeleton;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <>
      {Array.from({ length: isMobile ? 8 : 5 }).map((_, rowIndex) => (
        <Row
          style={{ direction: "rtl" }}
          gutter={[isMobile ? 0 : 24, 24]}
          justify="center"
          key={rowIndex}
          className="mb-6"
        >
          {Array.from({ length: isMobile ? 3 : 5 }).map((_, colIndex) => (
            <Col
              span={isMobile ? 8 : 4}
              key={colIndex}
              className="flex justify-center"
            >
              <Card
                bordered={false}
                hoverable={false}
                className={classNames(
                  "transition-transform duration-300 transform relative shadow-md rounded-lg",
                  isMobile ? "w-24 h-24" : "w-40 h-40"
                )}
              >
                <div className="flex flex-col items-center justify-between h-full gap-3">
                  {isMobile ? (
                    <div dir="rtl" className="flex flex-col items-center gap-2 w-full h-full justify-center -mt-4">
                    <Skeleton active paragraph={{ rows: 1 }} title={false} style={{ width: '80px', height: '12px', margin: '0 auto' }} />
                    <Avatar active size="default" shape="circle" />
                    <Skeleton active paragraph={{ rows: 1 }} title={false} style={{ width: '80px', height: '12px', margin: '0 auto' }} />
                  </div>
                  ) : (
                    <>
                      <Input active style={{ width: '60%' }} />
                      <Avatar active size="large" shape="circle" />
                      <Input active style={{ width: '60%' }} />
                    </>
                  )}
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
