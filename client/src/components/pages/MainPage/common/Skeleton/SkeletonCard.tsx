import React from 'react';
import { Skeleton } from 'antd';

const SkeletonCard: React.FC = () => {

  const { Input } = Skeleton;

  return (
    <div
      className="relative w-[320px] h-[240px] p-6 rounded-xl shadow-xl bg-gray-200 overflow-hidden"
    >
      <Skeleton active paragraph={{ rows: 2 }} title={false} />
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[85%]">
        <Input active style={{ width: '100%', height: '16px' }} />
      </div>
    </div>
  );
};

export default SkeletonCard;