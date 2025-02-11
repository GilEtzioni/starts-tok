import React from 'react';
import { Table, TableProps, Typography, Row, Grid } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchBestUsers } from '../../../../../api/pages';
import { BEST_USERS_TABLE } from '../../../requests/queryKeys';
import { getLanguge } from './useUsersTableImages';
import SkeltonPoints from '../Skeleton/SkeltonPoints';
import { useWithAuth } from '../../../../../api/common/withAuth';
import { UserTableType } from '../../../../../api/common/types';
import classNames from 'classnames';

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

  const withAuth = useWithAuth();

  const bestUsers = async (): Promise<UserTableType[]> => {
    const result = await withAuth((token) => fetchBestUsers(token));
    return result ?? [];
  };  
  
  const { data: usersScore, isLoading } = useQuery<UserTableType[]>(
    [BEST_USERS_TABLE],
    bestUsers)

  const { Title } = Typography;

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const tableWidth = isMobile ? 320 : 660;


  return (
    <div>
      <Row className={classNames("mt-2 flex justify-end", isMobile ? "mr-8" : "mr-16")}>
        <Title level={ isMobile ? 4 : 3 } className="text-right">המובילים השבוע</Title>
      </Row>
  
      <div className={classNames("rounded-lg bg-white", isMobile ? "w-[320px]" : "w-[660px]")}>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <SkeltonPoints width={tableWidth} height={isMobile ? 200 : 380} />
          </div>
        ) : (
        <Table
          columns={columns}
          dataSource={usersScore}
          pagination={false}
          className={classNames(
            "rounded-lg overflow-hidden",
            isMobile ? "w-[320px]" : "w-[660px]"
          )}
        />
        )}
      </div>
    </div>
  );
};

export default UsersTable;