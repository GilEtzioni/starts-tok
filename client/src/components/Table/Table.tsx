import React from 'react';
import { Table as AntTable, TableProps } from 'antd';
import "./Table.css";

const Table: React.FC = () => {
  const columns: TableProps<{ key: string; name: string; points: number }>['columns'] = [
    { title: 'שם', dataIndex: 'name', key: 'name', align: 'center' },
    { title: 'נקודות שבועית', dataIndex: 'points', key: 'points', align: 'center' },
  ];

  const data = [
    { key: '1', name: 'גיל', points: 32 },
    { key: '2', name: 'רוי', points: 42 },
    { key: '3', name: 'עמית', points: 35, },
    { key: '4', name: 'נדב', points: 51, },
  ];

  return (
    <div className="table-container">
      <h1 className="table-title">דירוג שבועי</h1>
      <div className="table-wrapper">
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