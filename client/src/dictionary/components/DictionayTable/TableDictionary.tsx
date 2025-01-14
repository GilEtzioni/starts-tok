// react + antd
import React from 'react';
import { Table } from 'antd';

import { handleClickedRow } from "../../utils/HelpingFunctionsDictionary";
import { WordsType } from "../../../types/types";
import MidIcons from "./MidIconds";
import useFilteredWords from '../../utils/dataEffect';

interface TableProps {
  words: WordsType[] | undefined;
}

const TableDictionary: React.FC<TableProps> = ({ words = [] }) => {
  const { filteredWords, translatedWords, setTranslatedWords } = useFilteredWords(words);

  return (
    <div className="w-4/5 mx-auto">
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
          dataIndex: 'germanWord',
          key: 'germanWord',
          align: 'right' as const,
        },
      ]}
      dataSource={filteredWords?.map((item) => ({
        key: item.wordId,
        id: item.wordId,
        hebrewWord: item.hebrewWord,
        germanWord: item.germanWord,
        courseNameEnglish: item.courseNameEnglish,
        knowlage: item.knowlage,
        hebrewLevel: item.hebrewLevel,
        englishLevel: item.englishLevel,
      }))}
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