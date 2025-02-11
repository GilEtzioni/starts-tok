import React from 'react';
import { Grid, Skeleton } from 'antd';
import classNames from 'classnames';

const SkeletonCard: React.FC = () => {
  const { Input } = Skeleton;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <div
      className={classNames(
        "relative p-6 rounded-xl shadow-xl bg-gray-200 overflow-hidden",
        isMobile
          ? "mx-auto min-w-[calc(38vw-1px)] h-[140px]"
          : "w-[320px] min-h-[240px] max-h-[240px] h-[240px]"
      )}
    >
      {isMobile ? (
        <div dir="rtl">
        <Skeleton active paragraph={{ rows: 2 }} title={false} />
        <div className="my-10" />
        <Skeleton active paragraph={{ rows: 1 }} title={false} />
      </div>
      ) : (
        <>
          <Skeleton active paragraph={{ rows: 2 }} title={false} />
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[85%]">
            <Input active style={{ width: '100%', height: '16px' }} />
          </div>
        </>
      )}
    </div>
  );
};

export default SkeletonCard;
