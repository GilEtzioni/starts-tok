// react + antd
import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './MainGames.css';
import OneCard from './OneCard';
import { useHangmanMaxScore } from './GameData'; 

const CardContainer: React.FC = () => {

  const { data } = useHangmanMaxScore();
  const hangmanScore = data?.maxScore ?? 0;


  const totalCards = 4;
  const initialCards = [1, 2, 3, 4];
  const [visibleCards, setVisibleCards] = useState<number[]>(initialCards);

  const cardNames = [ "מילון",  "איש תלוי",  "משחק מהירות", "משחק מילוי שורות",];

  const links = [ "/dictionary", "/hangman", "/speedGame",  "/wordle" ];

  const cardId = ["seven", "eight", "nine", "ten"];

  const gameScore = [-1, hangmanScore, 8, 11];
  // console.log("hangman Score", hangmanScore);

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
<div className="flex flex-col justify-between items-end gap-2 mt-5 w-full box-border">
<h1 className="self-end text-right rtl text-2xl font-bold mr-20"> תרגול</h1>
  
  <div className="flex items-center justify-center w-full gap-4 box-border">
    <LeftOutlined onClick={handleBackwardClick} className="cursor-pointer" />
    {visibleCards.map((card) => (
      <OneCard
        key={card}
        game={cardNames[card - 1]}
        link={links[card - 1]}
        number={cardId[card - 1]}
        score={gameScore[card-1]}
      />
    ))}
    <RightOutlined onClick={handleForwardClick} className="cursor-pointer" />
  </div>
</div>

  );
};

export default CardContainer;
