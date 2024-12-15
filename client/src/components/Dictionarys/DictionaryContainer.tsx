import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import DictionaryIcons from './DictionaryIcons';
import LevelButtonsContainer from './LevelButtonsContainer';

interface DataType {
  key: string;
  first: string;
  second: React.ReactNode;
}

const App: React.FC = () => {
  const [words, setWords] = useState<{ id: number; GermanWord: string }[]>([]);
  const [data, setData] = useState<DataType[]>([]);
  const [isA1, setIsA1] = useState("false");
  const [isA2, setIsA2] = useState("false");
  const [isA3, setIsA3] = useState("false");
  const [isA4, setIsA4] = useState("false");
  const [isA5, setIsA5] = useState("false");
  const [isA6, setIsA6] = useState("false");

  const [isEx, setIsEx] = useState("false");                     // X
  const [isVee, setIsVee] = useState("false");                   // V
  const [isQuestionMark, SetIsQuestionMark] = useState("false"); // ?

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
    <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
      <div
        style={{
          height: '120px', // Adjust the height as needed
          width: '800px',  // Adjust the width as needed
          padding: '16px', // Add padding inside the container
          border: '1px solid hsl(240, 5%, 64.9%)',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <DictionaryIcons />
        </div>
        <LevelButtonsContainer />
      </div>
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={false} 
        components={{
          header: {
            wrapper: () => null, 
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
