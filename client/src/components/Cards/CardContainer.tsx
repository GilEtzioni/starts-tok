import React, { useState } from 'react';
import OneCard from './OneCard';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Card.css';

const CardContainer: React.FC = () => {
  const totalCards = 6;
  const initialCards = [1, 2, 3, 4];
  const [visibleCards, setVisibleCards] = useState<number[]>(initialCards);

  const cardNames = [ "מבוא (A1)", "בסיסי (A2)", "בינוני (B1)", "מתקדם (B2)", "מתקדם מאוד (C1)", "שפת אם (C2)" ];

  const links = [ "/main/course/A1", "/main/course/A2", "/main/course/B1", "/main/course/B2", "/main/course/C1", "/main/course/C2" ];

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

  return (
    
    <div className="card-container">
      <h1 className="card-title">קורסים</h1>
      
      <div className="card-row">
        <LeftOutlined onClick={handleBackwardClick} className="card-arrow"  />
        {visibleCards.map((card) => (
          <OneCard key={card} level={cardNames[card - 1]} content="סיימת 0/25" link={links[card - 1]} />
        ))}
        <RightOutlined onClick={handleForwardClick} className="card-arrow" />
      </div>
    </div>
  );
};

export default CardContainer;
