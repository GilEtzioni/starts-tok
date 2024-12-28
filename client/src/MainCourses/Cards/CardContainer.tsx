// react + antd
import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// fetch
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../data/axiosInstance";

import './Card.css';
import { getArray } from "./Helper";

import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';

import OneCard from './OneCard';

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

  const cardNamesHebrew = [ "קורס ראשן",  "קורס שני",  "קורס שלישי", "קורס רביעי", "קורס חמישי",  "קורס שישי" ];
  const cardNamesGerman = [ "A1",  "A2",  "B1", "B2", "C1",  "C2" ];
  const images = [image1, image2, image3, image1, image2, image3];

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
    <div className="card-container">
      <h1 className="card-title">קורסים</h1>
      
      <div className="card-row">
        <LeftOutlined onClick={handleBackwardClick} className="card-arrow" />
        {visibleCards.map((card) => (
          <OneCard
            key={card}
            levelHebrew={cardNamesHebrew[card - 1]}
            levelGerman={cardNamesGerman[card - 1]}
            content={finished[card - 1].toString()}
            cardDetails={cardDetails[card-1]}
            link={links[card - 1]}
            number={cardId[card - 1]}
            image={images[card-1]}
          />
        ))}
        <RightOutlined onClick={handleForwardClick} className="card-arrow" />
      </div>
    </div>
  );
};

export default CardContainer;
