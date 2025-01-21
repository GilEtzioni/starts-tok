import React, { useState } from 'react';
import { Table } from 'antd';
import { handleClickedRow, knowledgeDataArray, sortWordsById } from "../../utils/HelpingFunctionsDictionary";
import { WordsType } from "../../../../api/common/types";
import MidIcons from "./MidIconds";
import { useTableEffect } from '../../utils/dataEffect';
import { ALL_DICTIONARY_WORDS } from '../../requests/queryKeys';
import { fetchDictionary } from '../../../../api/dictionary';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '../../../../app/store';
import { useSelector } from 'react-redux';
import { TranslatedWordsType } from '../../types/DictionaryType';

const TableDictionary: React.FC = () => {
      
  const knowledge = useSelector((state: RootState) => state.dictionary.knowledgeFilter);
  const level = useSelector((state: RootState) => state.dictionary.levelFilter);
  const clicks = useSelector((state: RootState) => state.dictionary.clickFilter);

  const [filteredWords, setFilteredWords] = useState<WordsType[]>([]);
  const [translatedWords, setTranslatedWords] = useState<TranslatedWordsType[]>([]);
  
  const { data: words } = useQuery(
    [ALL_DICTIONARY_WORDS],
    () => fetchDictionary(),
    {
      onSuccess: (words) => {
        {
        if (words === undefined || !words) return;
    
        setTranslatedWords([]); 
        const filterdknowledge = knowledgeDataArray(knowledge);
    
        // if nothing is selected -> show all data
        if (level.length === 0 && filterdknowledge.length === 0 && words) {
          setFilteredWords(sortWordsById([...words]));
          return;
        }
    
        let filtered = [...words];
    
        // if the user click on "A1" / "A2" / "B1" / "B2" / "C1" / "C2"
        if (level.length !== 0) {
          filtered = filtered.filter((item) => level.includes(item.englishLevel)); // filter by level
        }
    
        // if the user click on "V" / "?" / "X" 
        if (filterdknowledge.length !== 0) {
          filtered = filtered.filter((item) => filterdknowledge.includes(item.knowledge)); // Use `filterdKnowledge` directly
        }
    
        // show the filtered data by the id order
        setFilteredWords(filtered);
      }
      }
    }
);

  useTableEffect({ words, setFilteredWords, setTranslatedWords, clicks, knowledge, level });

  return (
    <div className="w-4/5 mx-auto">
    <Table
  columns={[
    {
      title: 'סינון',
      dataIndex: 'knowledge',
      key: 'knowledge',
      render: (text, row) => {
        const { knowledge, id } = row;
        if (knowledge) {
          return <MidIcons knowledge={knowledge} id={id} />;
        }
      },
    },
        // mid column
        // {
        //   title: '',
        //   dataIndex: 'HebreWord',
        //   key: 'HebreWord',
        //   align: 'center' as const,
        //   render: (item, row) => {
        //     // Check if the current row is in the translatedWords array
        //     const matchingEntry = translatedWords.find(([wordId]) => wordId === row.id);
        //     return matchingEntry ? row.hebrewWord : null;
        //   },
        // },
        // last column
        {
          title: 'מילה',
          dataIndex: 'foreignWord',
          key: 'foreignWord',
          align: 'right' as const,
        },
      ]}
      dataSource={filteredWords && filteredWords.length > 0 ? filteredWords.map((item) => ({
        key: item.wordId,
        id: item.wordId,
        hebrewWord: item.hebrewWord,
        foreignWord: item.foreignWord,
        courseNameEnglish: item.courseNameEnglish,
        knowledge: item.knowledge,
        hebrewLevel: item.hebrewLevel,
        englishLevel: item.englishLevel,
        wordOrder: item.wordOrder,
      })) : []} 
      pagination={false} // for css
      // when user click on the row
      onRow={(row) => ({
        // onClick: () => {
        //   const filteredClicked = handleClickedRow(row.id ?? 0, filteredWords, translatedWords);
        //   setTranslatedWords(filteredClicked);
        // },
      })}
    />
    </div>
  );
};

export default TableDictionary;