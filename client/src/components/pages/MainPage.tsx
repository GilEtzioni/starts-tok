import UsersGraph from "./MainPage/common/GraphMainPage/UsersGraph";
import CardContainer from "./MainPage/common/CoursesCards/components/CourseContainer";
import GameContainer from "./MainPage/common/GamesCards/components/GameContainer";
import UsersTable from "./MainPage/common/TableMainPage/UsersTable";

export default function MainPage() {
  return (
    <div className="w-full">
     <div className="w-full px-5">
        <CardContainer /> 
        <GameContainer />  
      </div>

      <div className="flex justify-between w-full p-5">
        <div className="flex-1 mr-2">
          <UsersGraph />
        </div>
        <div className="flex-1 ml-2">
          <UsersTable />
        </div>
      </div>
    </div>
  );
}
