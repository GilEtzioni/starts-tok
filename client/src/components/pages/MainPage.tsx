import UsersGraph from "./MainPage/components/GraphMainPage/UsersGraph";
import CardContainer from "./MainPage/components/CoursesCards/components/CourseContainer";
import GameContainer from "./MainPage/components/GamesCards/components/GameContainer";
import UsersTable from "./MainPage/components/TableMainPage/UsersTable";

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
