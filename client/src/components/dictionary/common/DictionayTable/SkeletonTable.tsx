import React from 'react';
import { Table, Skeleton } from 'antd';

const SkeletonTable: React.FC = () => {

  const dataSource = Array.from({ length: 10 }, (_, index) => ({
    key: index,
    knowledge: `Placeholder ${index + 1}`, 
    foreignWord: `Placeholder ${index + 1}`,
  }));

  return (
    <div>
        <Table
          columns={[
            {
              title: 'סינון',
              dataIndex: 'knowledge',
              key: 'knowledge',
              width: 250,
              render: () => <Skeleton active title={false} paragraph={{ rows: 1 }} />
            },
            {
              title: 'מילה',
              dataIndex: 'foreignWord',
              key: 'foreignWord',
              align: 'right' as const,
              width: 100, 
              render: () => (
                <div className="w-full flex justify-end items-center">
                  <Skeleton active title={false} paragraph={{ rows: 1 }} />
                </div>
              )
            },
          ]}
          dataSource={dataSource}
        />
    </div>
  );
};

export default SkeletonTable;