import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getNumberOfLessonsCompleted } from "./courseCardHelper";
import CourseCard from "./CourseCard";
import SkeletonCard from "../../Skeleton/SkeletonCard";
import { fetchLessonPage } from "../../../../../../api/pages";
import { Typography, Row, ConfigProvider, Grid } from "antd";
import { useQuery } from "@tanstack/react-query";
import { LESSONS_PAGE } from "../../../../requests/queryKeys";
import heIL from "antd/es/locale/he_IL";
import { useWithAuth } from "../../../../../../api/common/withAuth";
import classNames from "classnames";

const CardContainer: React.FC = () => {
  const { Title } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md; 

  const withAuth = useWithAuth();
  const course = () => withAuth((token) => fetchLessonPage(token));

  const { data: coursesData, isLoading } = useQuery([LESSONS_PAGE], course);

  const finished: number[] | undefined = getNumberOfLessonsCompleted(coursesData);
  const totalCards = 6;

  const initialCards: number[] = isMobile ? [2, 1] : [4, 3, 2, 1];
  
  const [visibleCards, setVisibleCards] = useState<number[]>(initialCards);
  
  useEffect(() => {
    setVisibleCards(isMobile ? [2, 1] : [4, 3, 2, 1]);
  }, [isMobile]);
  

  const cardNamesHebrew = [
    "קורס ראשון - מבוא",
    "קורס שני - בסיסי",
    "קורס שלישי - בינוני",
    "קורס רביעי - מתקדם",
    "קורס חמישי - מתקדם מאוד",
    "קורס שישי - שפת אם",
  ];
  const cardNamesGerman = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const cardDetails = [
    "ביטויים יומיומיים בסיסיים",
    "משימות פשוטות ונושאים מוכרים",
    "נלמד לדבר בצורה בסיסית",
    "נלמד לדבר בצורה שוטפת",
    "נושאים חברתיים, מקצועיים ואקדמיים",
    "אוצר מילים ודקדוק ברמה של שפת אם",
  ];
  const links = [
    "/main/course/A1",
    "/main/course/A2",
    "/main/course/B1",
    "/main/course/B2",
    "/main/course/C1",
    "/main/course/C2",
  ];

  const handleForwardClick = () => {
    setVisibleCards((prev) => prev.map((card) => (card - 2 + totalCards) % totalCards + 1));
  };

  const handleBackwardClick = () => {
    setVisibleCards((prev) => prev.map((card) => (card % totalCards) + 1));
  };

  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <div
        className={classNames(
          "flex flex-col justify-between items-end gap-2 w-full box-border",
          !isMobile ? "mt-5" : "mt-0"
          )}
        >

        <Row className={classNames("flex justify-end", isMobile ? "mr-12" : "mr-16")}>
          <Title level={3} className={classNames("text-right", isMobile ? "text-lg" : "text-2xl")}>
            קורסים
          </Title>
        </Row>

        <div className="flex items-center justify-center w-full gap-4 box-border">
        <div
            className={classNames(
              isMobile 
              ?  "ml-10"
              : "relative flex items-center justify-center group ml-10"
            )}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[calc(100%+10px)] h-[240px] bg-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
            <LeftOutlined
              onClick={handleBackwardClick}
              className="cursor-pointer relative z-10"
            />
          </div>

          <div
            className={classNames(
              "flex items-center justify-center mx-auto w-full",
              isMobile ? "gap-2 flex-nowrap overflow-visible max-w-[95%]" : "gap-4"
            )}
          >
            {isLoading
              ? [...Array(isMobile ? 2 : 4)].map((_, index) => <SkeletonCard key={index} />)
              : visibleCards.slice(0, isMobile ? 2 : 4).map((card: number) => (
                <CourseCard
                key={card}
                levelHebrew={cardNamesHebrew[card - 1]}
                levelGerman={cardNamesGerman[card - 1]}
                content={finished !== undefined ? finished[card - 1].toString() : ""}
                cardDetails={cardDetails[card - 1]}
                link={links[card - 1]}
                number={card}
              />
            ))}
          </div>

          <div
            className={classNames(
              
              isMobile
                ? "mr-10"
                : "relative flex items-center justify-center group mr-10"
            )}
          >
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[calc(100%+10px)] h-[240px] bg-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
          <RightOutlined
            onClick={handleForwardClick}
            className="cursor-pointer relative z-10"
          />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default CardContainer;