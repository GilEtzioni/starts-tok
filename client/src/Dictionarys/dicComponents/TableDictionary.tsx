// react + antd
import React, { useEffect, useState, useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { handleClickedRow } from './HelpingFunctionsDictionary';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../app/store";
import Item from 'antd/es/list/Item';

// word Type
import { WordsType } from "../../Dictionarys/types/wordType";

interface TableProps {
  words: any[];
  translateArray: [number, string][];
  setTranslateArray: React.Dispatch<React.SetStateAction<[number, string][]>>; // 2d array
}


const TableDictionary: React.FC<TableProps> = ({ words, translateArray, setTranslateArray }) => {
  const clicks = useSelector((state: RootState) => state.dictionay.clickFilter);
  const levelFilter = useSelector((state: RootState) => state.dictionay.levelFilter);

  const [filteredWords, setFilteredWords] = useState<WordsType[]>([]);

  useEffect(() => {
    
    // if nothing is selected -> show all data
    if (levelFilter.length === 0) {
      setFilteredWords([...words]); 
      return;
    }

    else {
      const filtered = words.filter((item) => levelFilter.includes(item.level_english)); // filter by level
      // filterd by knowlage...
      setFilteredWords([...filtered]); 
      console.log("Filtered words (before setState):", filtered);
    }
    
  }, [words, levelFilter, clicks]);
  

  return (
    <Table
      columns={[
        // first column
        {
          title: 'סינון',
          dataIndex: 'knowlage',
          key: 'knowlage',
        },
        // mid column
        {
          title: '',
          dataIndex: 'HebreWord',
          key: 'HebreWord',
          align: 'center' as const,
          render: (text, item) => {
            const matchingEntry = translateArray.find(([id]) => id === item.id);
            return matchingEntry ? matchingEntry[1] : null;
          },
        },
        // last column
        {
          title: 'מילה',
          dataIndex: 'GermanWord',
          key: 'GermanWord',
          align: 'right' as const,
        },
      ]}
      dataSource={filteredWords?.map((item) => ({
        key: item.id,
        id: item.id,
        HebrewWord: item.HebrewWord,
        GermanWord: item.GermanWord,
        course_name_english: item.course_name_english,
        knowlage: item.knowlage,
        level_hebrew: item.level_hebrew,
        level_english: item.level_english,
      }))}
      pagination={false} // for css
      // when user click on the row
      onRow={(row) => ({
        onClick: () => {
          handleClickedRow(row.id ?? 0, row.GermanWord, translateArray, setTranslateArray);
        },
      })}
    />
  );
};

export default TableDictionary;
