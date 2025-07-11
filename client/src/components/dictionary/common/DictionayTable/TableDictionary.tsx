import React, { useState } from 'react';
import { ConfigProvider, Grid, Table } from 'antd';
import { WordsType } from "../../../../api/common/types";
import MidIcons from "./MidIconds";
import { ALL_DICTIONARY_WORDS } from '../../requests/queryKeys';
import { fetchFilterDictionary } from '../../../../api/dictionary';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '../../../../app/store';
import { useSelector } from 'react-redux';
import { DictionaryKnowledgeType } from '../../../../api/common/types';
import SkeletonTable from './SkeletonTable';
import { useWithAuth } from '../../../../api/common/withAuth';
import classNames from 'classnames';

const TableDictionary: React.FC = () => {
  const knowledge = useSelector((state: RootState) => state.dictionary.knowledgeFilter);
  const level = useSelector((state: RootState) => state.dictionary.levelFilter);
  
  const [dataSource, setDataSource] = useState<WordsType[]>([]);
  
  const knowledgeArray: DictionaryKnowledgeType[] = [];
  if (knowledge.isVy) knowledgeArray.push(DictionaryKnowledgeType.Vy);
  if (knowledge.isEx) knowledgeArray.push(DictionaryKnowledgeType.Ex);
  if (knowledge.isQueistion) knowledgeArray.push(DictionaryKnowledgeType.QuestionMark);

  const withAuth = useWithAuth();
  const fetchWords = () => withAuth((token) => fetchFilterDictionary(level, knowledgeArray, token));

  const { data: words, isLoading } = useQuery(
    [ALL_DICTIONARY_WORDS, knowledge, level],
    fetchWords,
    {
      onSuccess: (words) => {
        if (!words) return;
        const transformedWords = words.map((item) => ({
          key: item.wordId,
          wordId: item.wordId,
          hebrewWord: item.hebrewWord,
          foreignWord: item.foreignWord,
          courseNameEnglish: item.courseNameEnglish,
          knowledge: item.knowledge,
          hebrewLevel: item.hebrewLevel,
          englishLevel: item.englishLevel,
          wordOrder: item.wordOrder,
          courseId: item.courseId,
          userId: item.userId,
          courseOrder: item.courseOrder,
        }));
        setDataSource(transformedWords);
      }
    }
  );
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  
  return (
    <div className="w-4/5 mx-auto">
      {isLoading ? (
        <SkeletonTable />
      ) : isMobile ? ( 
        <ConfigProvider
          theme={{
            token: {
              fontSize: 10, 
            },
          }}
        >
          <Table
            columns={[
              {
                title: 'סינון',
                dataIndex: 'knowledge',
                key: 'knowledge',
                render: (text, row) => {
                  const { knowledge, wordId } = row;
                  return knowledge ? <MidIcons knowledge={knowledge} wordId={wordId} /> : null;
                },
              },
              {
                title: 'תרגום',
                dataIndex: 'hebrewWord',
                key: 'hebrewWord',
                align: 'center' as const,
              },
              {
                title: 'מילה',
                dataIndex: 'foreignWord',
                key: 'foreignWord',
                align: 'right' as const,
              },
            ]}
            dataSource={dataSource}
            pagination={false}
            components={{
              body: {
                cell: ({ children }) => (
                  <td className="text-[10px]">{children}</td> // Smaller text for mobile
                ),
              },
              header: {
                cell: ({ children }) => (
                  <th className="text-[10px]">{children}</th> // Smaller text for mobile
                ),
              },
            }}
          />
        </ConfigProvider>
      ) : (
        <Table
          columns={[
            {
              title: 'סינון',
              dataIndex: 'knowledge',
              key: 'knowledge',
              render: (text, row) => {
                const { knowledge, wordId } = row;
                return knowledge ? <MidIcons knowledge={knowledge} wordId={wordId} /> : null;
              },
            },
            {
              title: 'תרגום',
              dataIndex: 'hebrewWord',
              key: 'hebrewWord',
              align: 'center' as const,
            },
            {
              title: 'מילה',
              dataIndex: 'foreignWord',
              key: 'foreignWord',
              align: 'right' as const,
            },
          ]}
          dataSource={dataSource}
          pagination={false}
        />
      )}
    </div>
  );  
}
  
export default TableDictionary;