import React from 'react';
import { Table as AntTable, TableProps } from 'antd';

const Table: React.FC = () => {
  const columns: TableProps<{ key: string; name: string; points: number }>['columns'] = [
    { title: 'נקודות שבועית', dataIndex: 'points', key: 'points', align: 'center' }, // Swapped to appear first
    { title: 'שם', dataIndex: 'name', key: 'name', align: 'center' }, // Now appears second
  ];

  const data = [
    { key: '1', name: 'גיל', points: 32 },
    { key: '2', name: 'רוי', points: 42 },
    { key: '3', name: 'עמית', points: 35 },
    { key: '4', name: 'נדב', points: 51 },
  ];

  return (
    <div className="flex flex-col items-start">
      <h1 className="self-end text-right rtl mb-5 text-2xl font-bold mr-20">דירוג שבועי</h1>
      <div className="w-[620px] border border-gray-400 rounded-lg shadow-md p-5 bg-white">
        <AntTable
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{ borderRadius: '8px', overflow: 'hidden' }}
        />
      </div>
    </div>
  );
};

export default Table;
