import { useQuery } from '@tanstack/react-query';
import axiosInstance from './dataDictionary/axiosInstance';
import { WordsType } from './types/wordType';
import "./MainDictionary.css";

import TopIcons from './dicComponents/TopComponents/TopIcons';
import ButtonsContainer from './dicComponents/TopComponents/ButtonsContainer';
import TableDictionary from './dicComponents/midComponents/TableDictionary';
import { useEffect } from 'react';

const MainDictionary: React.FC = () => {
  const fetchItems = async (): Promise<WordsType[]> => {
    const { data } = await axiosInstance.get('/dictionary');
    return data;
  };

  const { data: words, isLoading, error } = useQuery(['dictionary'], fetchItems);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <div className='main-container'>
        <div className='second-container' >
          <div  className='third-container'>
            <TopIcons />
          </div>
          <ButtonsContainer />
        </div>
      </div>
      <div className='table-container'>
      <TableDictionary words={words} />
      </div>
    </>
  );
};

export default MainDictionary;
