import React from "react";
import { Tour, Button, ConfigProvider, Grid } from "antd";
import UsersGraph from "./MainPage/common/GraphMainPage/UsersGraph";
import CardContainer from "./MainPage/common/CoursesCards/common/CourseContainer";
import GameContainer from "./MainPage/common/GamesCards/components/GameContainer";
import UsersTable from "./MainPage/common/TableMainPage/UsersTable";
import heIL from "antd/es/locale/he_IL"; // hebrew antd
import classNames from "classnames";
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

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <div className="w-full relative">

    <ConfigProvider direction="rtl" locale={heIL}>
      {!isMobile && <Tour open={open} onClose={() => setOpen(false)} steps={steps} />}
    </ConfigProvider>

      <div className="w-full">
        <div ref={cardRef}>
          <CardContainer />
        </div>
        <div ref={gameRef}>
          <GameContainer />
        </div>
      </div>
      <div
        className={classNames(
          "flex w-full p-5",
          isMobile ? "flex-col gap-4" : "justify-between"
        )}
      >
        <div className={classNames("flex-1", isMobile ? "mr-0" : "mr-2")} ref={graphRef}>
          <UsersGraph />
        </div>
        <div className={classNames("flex-1", isMobile ? "ml-0" : "ml-2")} ref={tableRef}>
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default MainPage;