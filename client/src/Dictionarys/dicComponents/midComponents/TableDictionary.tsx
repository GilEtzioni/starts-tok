// react + antd
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { handleClickedRow, sortWordsById } from '../HelpingFunctionsDictionary';

// redux
import { useSelector } from 'react-redux';
import { RootState } from "../../../app/store";

// word Type
import { WordsType } from "../../types/wordType";
import { knowlageDataArray } from "../HelpingFunctionsDictionary"

import MidIcons from "./MidIconds";

interface TableProps {
  words?: Array<WordsType>;
}

const TableDictionary: React.FC<TableProps> = ({ words = [] }) => {
  // redux
  const clicksRedux = useSelector((state: RootState) => state.dictionay.clickFilter);
  const levelRedux = useSelector((state: RootState) => state.dictionay.levelFilter);
  const knowlageRedux = useSelector((state: RootState) => state.dictionay.knowlageFilter);

  const [filteredWords, setFilteredWords] = useState<WordsType[]>([]);
  const [translatedWords, setTranslatedWords] = useState<Array<[number, string]>>([]);


  useEffect(() => {
    setTranslatedWords([]); 
    const filterdKnowlage = knowlageDataArray(knowlageRedux);
 
    // if nothing is selected -> show all data
    if (levelRedux.length === 0 && filterdKnowlage.length === 0) {
      setFilteredWords(sortWordsById([...words]));
      return;
    }

    let filtered = [...words];

    // if the user click on "A1" / "A2" / "B1" / "B2" / "C1" / "`C2"
    if (levelRedux.length !== 0) {
      filtered = filtered.filter((item) => levelRedux.includes(item.levelEnglish)); // filter by level
    }

    // if the user click on "V" / "?" / "X" 
    if (filterdKnowlage.length !== 0) {
      filtered = filtered.filter((item) => filterdKnowlage.includes(item.knowlage)); // Use `filterdKnowlage` directly
    }

    // show the filtered data by the id order
    setFilteredWords(sortWordsById(filtered));
  }, [words, levelRedux, clicksRedux, knowlageRedux]);
  return (
    <div className="table-wrapper">
    <Table
      columns={[
        // first column
        {
          title: 'סינון',
          dataIndex: 'knowlage',
          key: 'knowlage',
          render: (knowlage, row) => {
            const id = row.id ?? -1;
            return <MidIcons knowlage={knowlage} id={id} />;
          },
        },
        // mid column
        {
          title: '',
          dataIndex: 'HebreWord',
          key: 'HebreWord',
          align: 'center' as const,
          render: (item, row) => {
            // Check if the current row is in the translatedWords array
            const matchingEntry = translatedWords.find(([wordId]) => wordId === row.id);
            return matchingEntry ? row.HebrewWord : null;
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
        courseNameEnglish: item.courseNameEnglish,
        knowlage: item.knowlage,
        levelHebrew: item.levelHebrew,
        levelEnglish: item.levelEnglish,
      }))}
      pagination={false} // for css
      // when user click on the row
      onRow={(row) => ({
        onClick: () => {
          const filteredClicked = handleClickedRow(row.id ?? 0, filteredWords, translatedWords);
          setTranslatedWords(filteredClicked);
        },
      })}
    />
    </div>
  );
};

export default TableDictionary;