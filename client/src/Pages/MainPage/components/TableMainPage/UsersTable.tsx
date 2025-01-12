import React from 'react';
import { Table as AntTable, TableProps, Typography, Row } from 'antd';

const UsersTable: React.FC = () => {
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

  const { Title } = Typography;

  return (
    <div >
      <Row className="mb-2 mt-2 mr-24 flex justify-end">
        <Title level={3} className="text-right">דירוג שבועי</Title>
      </Row> 

      <div className="w-[620px] border border-gray-400 rounded-lg shadow-md p-5 bg-white">
        <AntTable
          columns={columns}
          dataSource={data}
          pagination={false}
          className="rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
};

export default UsersTable;