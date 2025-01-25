import React from 'react';
import { Table, TableProps, Typography, Row } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchBestUsers, fetchCoursesCards } from '../../../../../api/pages';
import { BEST_USERS_TABLE } from '../../../requests/queryKeys';
import { UserTableType } from '../../../../../api/common/types';
import { getLanguge } from './useUsersTableImages';
import SkeltonPoints from '../Skeleton/SkeltonPoints';

const UsersTable: React.FC = () => {
  const columns: TableProps<UserTableType>['columns'] = [
    { title: 'נקודות שבועית', dataIndex: 'totalPoints', key: 'points', align: 'center' },
    { title: 'שם', dataIndex: 'userName', key: 'userName', align: 'center' },
    {
      title: 'שפה',
      dataIndex: 'language',
      key: 'language',
      align: 'center',
      render: (_, record) => getLanguge(record.language),
    },
    { title: 'מקום', dataIndex: 'key', key: 'key', align: 'center' },
  ];

  const { data: usersScore, isLoading } = useQuery<UserTableType[]>(
    [BEST_USERS_TABLE],
    fetchBestUsers
  );
  const { Title } = Typography;

  return (
    <div>
      <Row className="mt-2 mr-16 flex justify-end">
        <Title level={3} className="text-right">המובילים השבוע</Title>
      </Row>

      <div className="w-[660px] rounded-lg bg-white">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <SkeltonPoints width={660} height={380} />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={usersScore}
            pagination={false}
            className="rounded-lg overflow-hidden"
          />
        )}
      </div>
    </div>
  );
};

export default UsersTable;