// react + antd
import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

// fetch
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { WordsType } from "../types/wordType";

// components
import DictionaryIcons from './DictionaryIcons';
import LevelButtonsContainer from './LevelButtonsContainer';

// table props
interface TableProps {
  key: string;
  first: string;
  second: React.ReactNode;
}

const App: React.FC = () => {

  // fetch
  const fetchItems = async (): Promise<WordsType[]> => {
    const { data } = await axiosInstance.get("/dictionary");
    return data;
  };

  // data: words -> the data called "items"
  const { data: words, isLoading, error } = useQuery(["dictionary"], fetchItems);

  // translate (2d array)
  const [translateArray, setTranslateArray] = useState<[number, string][]>([]);

  // number = id , string = germaN word
  const wordsClicked: Array<[number, string]> = [];


  function handleClickedRow(id: number, word: string, translateArray: [number, string][], 
    setTranslateArray: React.Dispatch<React.SetStateAction<[number, string][]>>) {
    const existingIndex = translateArray.findIndex(([existingId]) => existingId === id); // find the item by id
  
    // remove the item (if it's already in the list)
    if (existingIndex !== -1) {
      setTranslateArray((prev) => prev.filter(([existingId]) => existingId !== id));
    } else {
      // add the new item (if it's not in the list)
      setTranslateArray((prev) => [...prev, [id, word]]);
    }
  }
  

  return (
    <>
    {/* top buttons */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
      <div style={{ height: '120px', width: '800px', padding: '16px', border: '1px solid hsl(240, 5%, 64.9%)',
                    borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, background-color 0.3s ease' }} >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>

        <DictionaryIcons />
      </div>
      <LevelButtonsContainer />
    </div>


    </div >
    <Table 
  columns={[
    // first column - X / V/ ?
    {
      title: 'סינון',
      key: 'actions',
      align: 'left' as const, // ltr
      render: () => <DictionaryIcons />,
    },

    // translate column (center column)
    {
      title: 'Level (English)',
      dataIndex: 'level_english',
      key: 'level_english',
      align: 'center' as const,
      render: (text, item) => {
        const matchingEntry = translateArray.find(([id]) => id === item.id); // Find the matching row in translateArray
        return matchingEntry ? matchingEntry[1] : null; // Return the word if it exists, otherwise return null
      }
    },

    // second column - german word
    {
      title: 'מילה',
      dataIndex: 'GermanWord',
      key: 'GermanWord',
      align: 'right' as const, // css
    },
  ]}
  // Data source -> required property for the Ant Design Table
  dataSource={words?.map((item) => ({
    key: item.id, // unique key for row handle function
    id: item.id, 
    HebrewWord: item.HebrewWord,
    GermanWord: item.GermanWord,
    course_name_english: item.course_name_english,
    knowlage: item.knowlage,
    level_hebrew: item.level_hebrew,
    level_english: item.level_english,
  }))}
  pagination={false} // for css
  // row click handler
  onRow={(row) => ({
    onClick: () => {
      handleClickedRow(row.id ?? 0, row.GermanWord, translateArray, setTranslateArray)
    },
  })}
/>
    </>
  );
};

export default App;


