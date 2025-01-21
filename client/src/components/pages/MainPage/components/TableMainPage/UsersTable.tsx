import React from 'react';
import { Table, TableProps, Typography, Row, Col, Image } from 'antd';

import germanyPNG from "../../images/germanIcon.png"
import usaPNG from "../../images/usaIcon.png";
import francePNG from "../../images/franceIcon.png";

const UsersTable: React.FC = () => {
  const columns: TableProps<{ key: number; logo: any; name: string; points: number }>['columns'] = [
    { title: 'נקודות שבועית', dataIndex: 'points', key: 'points', align: 'center' },
    { title: 'שם', dataIndex: 'name', key: 'name', align: 'center' },
    { title: 'שפה', dataIndex: 'logo', key: 'logo', align: 'center' },
    { title: 'מקום', dataIndex: 'key', key: 'order', align: 'center' },
  ];

  const germanIcon = (
    <Image
      width={20}
      preview={false}
      className="rounded-sm mr-5 mt-0.5"
      src={germanyPNG}
    />
  );

  const usaIcon = (
    <Image
      width={20}
      preview={false}
      className="rounded-sm mr-5 mt-0.5"
      src={usaPNG}
    />
  );

  const franceIcon = (
    <Image
      width={20}
      preview={false}
      className="rounded-sm mr-5 mt-0.5"
      src={francePNG}
    />
  );

  const data = [
    { key: 1, logo: germanIcon, name: 'גיל', points: 55 },
    { key: 2, logo: franceIcon, name: 'רוי', points: 51 },
    { key: 3, logo: usaIcon, name: 'עמית', points: 48 },
    { key: 4, logo: germanIcon, name: 'נדב', points: 47 },
    { key: 5, logo: usaIcon, name: 'נעם', points: 46 },
  ];

  const { Title } = Typography;

  return (
    <div >
      <Row className="mb-2 mt-2 mr-16 flex justify-end">
        <Title level={3} className="text-right"> המובילים השבוע</Title>
      </Row> 
      
      <div className="w-[660px] rounded-lg bg-white">
        <Table
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