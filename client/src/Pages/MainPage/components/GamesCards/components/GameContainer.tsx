import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import GameCard from './GameCard';
import { useHangmanMaxScore } from '../../../api/fetchingMainPage'; 
import { Typography, Row } from 'antd';

const GameContainer: React.FC = () => {

  const { data: hangmanScore, isLoading, error } = useHangmanMaxScore();

  const totalCards = 4;
  const initialCards = [1, 2, 3, 4];
  const [visibleCards, setVisibleCards] = useState<number[]>(initialCards);

  const cardNames = [ "מילון",  "איש תלוי",  "משחק מהירות", "וורדל",];
  const links = [ "/dictionary", "/hangman", "/speedGame",  "/wordle" ];
  const gameScore = [
    834, 
    hangmanScore?.maxScore ?? 0, 
    3, 
    11
  ];

  function handleForwardClick() {
    setVisibleCards((prev) => prev.map((card) => (card % totalCards) + 1));
  }

  function handleBackwardClick() {
    setVisibleCards((prev) => prev.map((card) => (card - 2 + totalCards) % totalCards + 1));
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;


  const { Title } = Typography;

  return (
    <div className="flex flex-col justify-between items-end gap-2 mt-5 w-full box-border">
        <Row className="mr-16 flex justify-end">
          <Title level={3} className="text-right"> תרגול </Title>
        </Row> 
      <div className="flex items-center justify-center w-full gap-4 box-border">

        <div className="relative flex items-center justify-center group">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[calc(100%+10px)] h-[240px] bg-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
          <LeftOutlined onClick={handleBackwardClick} className="cursor-pointer relative z-10" />
        </div>
  
        {visibleCards.map((card) => (
          <GameCard
            key={card}
            game={cardNames[card - 1]}
            link={links[card - 1]}
            number={card}
            score={gameScore[card - 1]} 
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

export default GameContainer;