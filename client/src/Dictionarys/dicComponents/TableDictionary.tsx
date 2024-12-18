import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { handleClickedRow } from './HelpingFunctionsDictionary';

interface TableProps {
  words: any[];
  translateArray: [number, string][];
  setTranslateArray: React.Dispatch<React.SetStateAction<[number, string][]>>;
}

const TableDictionary: React.FC<TableProps> = ({ words, translateArray, setTranslateArray }) => {
  return (
    <Table
      columns={[
        {
          title: 'סינון',
          key: 'actions',
          align: 'left' as const,
          render: () => <div>Actions</div>,
        },
        {
          title: 'Level (English)',
          dataIndex: 'level_english',
          key: 'level_english',
          align: 'center' as const,
          render: (text, item) => {
            const matchingEntry = translateArray.find(([id]) => id === item.id);
            return matchingEntry ? matchingEntry[1] : null;
          },
        },
        {
          title: 'מילה',
          dataIndex: 'GermanWord',
          key: 'GermanWord',
          align: 'right' as const,
        },
      ]}
      dataSource={words?.map((item) => ({
        key: item.id,
        id: item.id,
        HebrewWord: item.HebrewWord,
        GermanWord: item.GermanWord,
        course_name_english: item.course_name_english,
        knowlage: item.knowlage,
        level_hebrew: item.level_hebrew,
        level_english: item.level_english,
      }))}
      pagination={false}
      onRow={(row) => ({
        onClick: () => {
          handleClickedRow(row.id ?? 0, row.GermanWord, translateArray, setTranslateArray);
        },
      })}
    />
  );
};

export default TableDictionary;
