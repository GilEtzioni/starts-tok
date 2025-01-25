import React from 'react';
import { Skeleton } from 'antd';

interface SkeltonPointsProps {
  width: number;
  height: number;
  style?: React.CSSProperties;
}

const SkeltonPoints: React.FC<SkeltonPointsProps> = ({ width, height, style }) => {

  const { Input } = Skeleton

  return (
    <div
      className="relative p-6 rounded-xl shadow-xl bg-gray-200 overflow-hidden"
      style={{ width, height, ...style }}
    >
      <Skeleton active paragraph={{ rows: 2 }} title={false} />
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2" style={{ width: '85%' }}>
        <Input active style={{ width: '100%', height: '16px' }} />
      </div>
    </div>
  );
};

export default SkeltonPoints;