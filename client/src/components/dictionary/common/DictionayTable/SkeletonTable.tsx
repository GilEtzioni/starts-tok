import React from 'react';
import { Table, Skeleton } from 'antd';

const SkeletonTable: React.FC = () => {
    <div className="w-4/5 mx-auto"></div>
  const columns = [
    {
      title: 'סינון',
      dataIndex: 'knowledge',
      key: 'knowledge',
      render: () => <Skeleton active title={false} paragraph={{ rows: 1 }} />, 
    },
    {
      title: 'מילה',
      dataIndex: 'anotherField',
      key: 'anotherField',
      render: () => <Skeleton active title={false} paragraph={{ rows: 1 }} />, 
    },
  ];

  const dataSource = Array.from({ length: 10 }, (_, index) => ({
    key: index,
    knowledge: `Placeholder ${index + 1}`, 
    anotherField: `Placeholder ${index + 1}`,
  }));

  return (
    <div className="w-4/5 mx-auto">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false} 
      />
    </div>
  );
};

export default SkeletonTable;