import TopIcons from "./components/FilterContainer/TopIcons";
import ButtonsContainer from './components/FilterContainer/ButtonsContainer';
import TableDictionary from './components/DictionayTable/TableDictionary';

import MainAddWord from './components/AddWordButton/MainAddWord';
import MainStatics from './components/StaticsButton/MainStatics';
import { useFetchWordsData } from './api/fetchingDictionary';

const MainDictionary: React.FC = () => {

  const { data: words, isLoading, error } = useFetchWordsData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  console.log("words: ", words);
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
