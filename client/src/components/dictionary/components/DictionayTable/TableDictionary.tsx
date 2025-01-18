// react + antd
import React, { useEffect } from 'react';
import { Table } from 'antd';

import { handleClickedRow } from "../../utils/HelpingFunctionsDictionary";
import { WordsType } from "../../../../api/common/types";
import MidIcons from "./MidIconds";
import useFilteredWords from '../../utils/dataEffect';

interface TableProps {
  words: WordsType[] | undefined;
}

const TableDictionary: React.FC<TableProps> = ({ words = [] }) => {
  const { filteredWords, translatedWords, setTranslatedWords } = useFilteredWords(words);

  if(filteredWords === undefined) return;

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
          dataIndex: 'germanWord',
          key: 'germanWord',
          align: 'right' as const,
        },
      ]}
      dataSource={filteredWords && filteredWords.length > 0 ? filteredWords.map((item) => ({
        key: item.wordId,
        id: item.wordId,
        hebrewWord: item.hebrewWord,
        germanWord: item.germanWord,
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