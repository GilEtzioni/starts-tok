import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getNumberOfLessonsCompleted } from "./Helper"
import CourseCard from "./CourseCard";
import { fetchLessonPage } from '../../../../../../api/pages'; 
import { Typography, Row } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { LESSONS_PAGE } from '../../../../requests/queryKeys';

const CardContainer: React.FC = () => {

  const { data: coursesData, isLoading } = useQuery(
    [LESSONS_PAGE],
    () => fetchLessonPage(),
  );

  const finished: number[] | undefined = getNumberOfLessonsCompleted(coursesData);

  const totalCards = 6;
  const initialCards = [4, 3, 2, 1];
  const [visibleCards, setVisibleCards] = useState<number[]>(initialCards);

  const cardNamesHebrew = [
    "קורס ראשון - מבוא",
    "קורס שני - בסיסי",
    "קורס שלישי - בינוני",
    "קורס רביעי - מתקדם",
    "קורס חמישי - מתקדם מאוד",
    "קורס שישי - שפת אם"
  ];
  const cardNamesGerman = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const cardDetails = [
    "ביטויים יומיומיים בסיסיים",
    "משימות פשוטות ונושאים מוכרים",
    "נלמד לדבר בצורה בסיסית",
    "נלמד לדבר בצורה שוטפת",
    "נושאים חברתיים, מקצועיים ואקדמיים",
    "אוצר מילים ודקדוק ברמה של שפת אם"
  ];
  const links = [
    "/main/course/A1",
    "/main/course/A2",
    "/main/course/B1",
    "/main/course/B2",
    "/main/course/C1",
    "/main/course/C2"
  ];

  function handleForwardClick() {
    setVisibleCards((prev) => prev.map((card) => (card % totalCards) + 1));
  }
  
  function handleBackwardClick() {
    setVisibleCards((prev) => prev.map((card) => (card - 2 + totalCards) % totalCards + 1));
  }

  if (isLoading) return <div>Loading...</div>;
  
  const { Title } = Typography;

  return (
    <div className="flex flex-col justify-between items-end gap-2 mt-5 w-full box-border">
        <Row className="mr-16 flex justify-end">
          <Title level={3} className="text-right"> קורסים </Title>
        </Row> 

      <div className="flex items-center justify-center w-full gap-4 box-border">

        <div className="relative flex items-center justify-center group">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[calc(100%+10px)] h-[240px] bg-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
          <LeftOutlined onClick={handleBackwardClick} className="cursor-pointer relative z-10" />
        </div>
  
        {visibleCards.reverse().map((card) => (
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
  
        <div className="relative flex items-center justify-center group">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[calc(100%+10px)] h-[240px] bg-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
          <RightOutlined onClick={handleForwardClick} className="cursor-pointer relative z-10" />
        </div>
      </div>
    </div>
  );
}  
export default CardContainer;