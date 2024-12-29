// react + antd
import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// fetch
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../data/axiosInstance";

import './MainCourses.css';
import { getArray } from "./Helper";
import CourseCard from './CourseCard';

const CardContainer: React.FC = () => {
  const fetchItems = async ()  => {
    const { data } = await axiosInstance.get("/main/finished");
    return data;
  };

  const { data: coursesData = [], isLoading, error } = useQuery(
    ['coursesData'], 
    fetchItems
  );

  const finished: Array<number> = getArray(coursesData);

  const totalCards = 6;
  const initialCards = [1, 2, 3, 4];
  const [visibleCards, setVisibleCards] = useState<number[]>(initialCards);

  const cardNamesHebrew = [ "קורס ראשון - מבוא",  "קורס שני - בסיסי",  "קורס שלישי - בינוני", "קורס רביעי - מתקדם", "קורס חמישי -  מתקדם מאוד",  "קורס שישי - שפת אם" ];
  const cardNamesGerman = [ "A1",  "A2",  "B1", "B2", "C1",  "C2" ];

  const cardDetails = [
    "ביטויים יומיומיים בסיסיים",
    "משימות פשוטות ונושאים מוכרים",
    "נלמד לדבר בצורה בסיסית",
    "נלמד לדבר בצורה שוטפת",
    "נושאים חברתיים, מקצועיים ואקדמיים",
    "אוצר מילים ודקדוק ברמה של שפת אם"
  ]

  const links = [  "/main/course/A1", "/main/course/A2", "/main/course/B1",  "/main/course/B2", "/main/course/C1", "/main/course/C2" ];

  const cardId = ["one", "two", "three", "four", "five", "six"];

  function handleForwardClick() {
    setVisibleCards((prev) =>
      prev.map((card) => (card % totalCards) + 1)
    );
  }

  function handleBackwardClick() {
    setVisibleCards((prev) =>
      prev.map((card) => (card - 2 + totalCards) % totalCards + 1)
    );
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
<div className="flex flex-col justify-between items-end gap-2 mt-5 w-full box-border">
  <h1 className="self-end text-right rtl text-2xl font-bold mr-20"> קורסים</h1>
  
  <div className="flex items-center justify-center w-full gap-4 box-border">
    <LeftOutlined onClick={handleBackwardClick} className="cursor-pointer" />
    {visibleCards.map((card) => (
      <CourseCard
        key={card}
        levelHebrew={cardNamesHebrew[card - 1]}
        levelGerman={cardNamesGerman[card - 1]}
        content={finished[card - 1].toString()}
        cardDetails={cardDetails[card-1]}
        link={links[card - 1]}
        number={cardId[card - 1]}
      />
    ))}
    <RightOutlined onClick={handleForwardClick} className="cursor-pointer" />
  </div>
</div>

  );
};

export default CardContainer;