import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import DictionaryIcons from './DictionaryIcons';
import LevelButtonsContainer from './LevelButtonsContainer';
import SettingsButton from './SettingsButton';

interface DataType {
  key: string;
  first: string;
  second: React.ReactNode;
}

const App: React.FC = () => {
  const [words, setWords] = useState<{ id: number; GermanWord: string }[]>([]);
  const [data, setData] = useState<DataType[]>([]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/`);
        const allData = await response.json();
        console.log('Fetched data in React:', allData); // Log the fetched data
        setWords(allData);

        // Transform `words` into `data` for the table
        const transformedData = allData.map((word: { id: number; GermanWord: string }) => ({
          key: word.id.toString(),
          first: word.GermanWord,
          second: <DictionaryIcons />,
        }));
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data in React:', error); // Log errors
      }
    };

    fetchData();
  }, []);

  // Define columns for the Ant Design Table
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'first',
      key: 'first',
      title: 'First',
    },
    {
      dataIndex: 'second',
      key: 'second',
      title: 'Second',
    },
  ];

  return (
    <>
      <SettingsButton />
      <LevelButtonsContainer />
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={false} // Disable pagination
        components={{
          header: {
            wrapper: () => null, // Remove the header row
          },
        }}
        rowClassName={(record, index) => {
          if (index === 0) return 'table-row-first'; // First row
          if (index === data.length - 1) return 'table-row-last'; // Last row
          return '';
        }}
      />
    </>
  );
};

export default App;
