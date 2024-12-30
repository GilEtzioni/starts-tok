import { useQuery } from '@tanstack/react-query';
import axiosInstance from './dataDictionary/axiosInstance';
import { WordsType } from './types/wordType';

import TopIcons from './dicComponents/TopComponents/TopIcons';
import ButtonsContainer from './dicComponents/TopComponents/ButtonsContainer';
import TableDictionary from './dicComponents/midComponents/TableDictionary';
import MainAddWord from './addWord/MainAddWord';
import MainStatics from './statics/MainStatics';

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
      <div className="flex justify-center items-center mt-4">
        <div className="h-[160px] w-[800px] p-4 border border-gray-400 rounded-lg shadow-lg transition-transform duration-300">

        <div className="flex justify-center items-center space-x-4 mb-4">
            <MainAddWord />
            <MainStatics words={words}/>
        </div>

        <div className="flex justify-center mb-4">
          <TopIcons />
        </div>
          <ButtonsContainer />
        </div>
        
      </div>
      <div className="mt-5">
        <TableDictionary words={words} />
      </div>
    </>
  );
};

export default MainDictionary;
