import React from 'react';
import { Table as AntTable, TableProps } from 'antd';

const Table: React.FC = () => {
  // Define table columns with correct type
  const columns: TableProps<{ key: string; name: string; points: number }>['columns'] = [
    {
      title: 'שם',
      dataIndex: 'name',
      key: 'name',
      align: 'center', // Use correct type for align
    },
    {
      title: 'נקודות שבועית',
      dataIndex: 'points',
      key: 'points',
      align: 'center', // Use correct type for align
    },
  ];

  // Define table data
  const data = [
    {
      key: '1',
      name: 'גיל',
      points: 32,
    },
    {
      key: '2',
      name: 'רוי',
      points: 42,
    },
    {
      key: '3',
      name: 'עמית',
      points: 35,
    },
    {
      key: '4',
      name: 'נדב',
      points: 51,
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'right', direction: 'rtl', marginBottom: '20px' }}>
        דירוג שבועי
      </h1>
      <div
        style={{
          border: '1px solid hsl(240, 5%, 64.9%)',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          background: '#fff',
        }}
      >
        <AntTable
          columns={columns}
          dataSource={data}
          pagination={false} // Disable pagination
          style={{ borderRadius: '8px', overflow: 'hidden' }}
        />
      </div>
    </div>
  );
};

export default Table;
