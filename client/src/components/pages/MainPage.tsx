import React from "react";
import { Tour, Button, ConfigProvider } from "antd";
import UsersGraph from "./MainPage/common/GraphMainPage/UsersGraph";
import CardContainer from "./MainPage/common/CoursesCards/common/CourseContainer";
import GameContainer from "./MainPage/common/GamesCards/components/GameContainer";
import UsersTable from "./MainPage/common/TableMainPage/UsersTable";
import heIL from "antd/es/locale/he_IL"; // hebrew antd
interface MainPagePros {
  cardRef: any, 
  gameRef: any, 
  graphRef: any, 
  tableRef: any,
  steps: any, 
  setOpen: any,
  open: any
}

const MainPage: React.FC<MainPagePros> = ({ cardRef, gameRef, graphRef, tableRef, steps, setOpen, open }) => {

  return (
    <div className="w-full relative">

      <ConfigProvider direction="rtl" locale={heIL}>
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      </ConfigProvider>

      <div className="w-full px-5">
        <div ref={cardRef}>
          <CardContainer />
        </div>
        <div ref={gameRef}>
          <GameContainer />
        </div>
      </div>

      <div className="flex justify-between w-full p-5">
        <div className="flex-1 mr-2" ref={graphRef}>
          <UsersGraph />
        </div>
        <div className="flex-1 ml-2" ref={tableRef}>
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default MainPage;