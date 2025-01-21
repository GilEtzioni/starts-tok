import TopIcons from "./common/FilterContainer/TopIcons";
import ButtonsContainer from './common/FilterContainer/ButtonsContainer';
import TableDictionary from './common/DictionayTable/TableDictionary';
import MainAddWord from './common/AddWordButton/MainAddWord';
import MainStatics from './common/StaticsButton/MainStatics';

const MainDictionary: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <div className="h-[160px] w-[900px] p-4 border border-gray-400 rounded-lg shadow-lg transition-transform duration-300">

        <div className="flex justify-center items-center space-x-4 mb-4">
            <MainAddWord />
            <MainStatics/>
        </div>

        <div className="flex justify-center mb-4">
          <TopIcons />
        </div>
          <ButtonsContainer />
        </div>
        
      </div>
      <div className="mt-5">
        <TableDictionary />
      </div>
    </>
  );
};

export default MainDictionary;