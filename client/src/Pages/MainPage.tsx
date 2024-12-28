import Graph from "../components/Graph/Graph";
import CardContainer from '../MainCourses/Cards/CardContainer';
import GameContainer from "../MainGames/GameContainer";
import Table from '../components/Table/Table';

export default function MainPage() {
  return (
    <div className="w-full">
      {/* Main Card and Game Section */}
      <div className="w-full px-5">
        <CardContainer />
        <GameContainer />
      </div>

      {/* Graph and Table Section */}
      <div className="flex justify-between w-full p-5">
        <div className="flex-1 mr-2">
          <Graph />
        </div>
        <div className="flex-1 ml-2">
          <Table />
        </div>
      </div>
    </div>
  );
}
