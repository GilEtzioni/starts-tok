import TopIcons from "./common/FilterContainer/TopIcons";
import ButtonsContainer from './common/FilterContainer/ButtonsContainer';
import TableDictionary from './common/DictionayTable/TableDictionary';
import MainAddWord from './common/AddWordButton/MainAddWord';
import MainStatics from './common/StaticsButton/MainStatics';
import { Grid } from "antd";
import classNames from "classnames";

const MainDictionary: React.FC = () => {

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <div 
          className={classNames(
            "p-4 border border-gray-400 rounded-lg shadow-lg transition-transform duration-300",
            isMobile ? "w-[95%] h-[260px]" : "h-[160px] w-[900px]"
          )}>
        
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