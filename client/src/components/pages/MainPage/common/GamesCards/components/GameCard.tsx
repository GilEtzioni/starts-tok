import React, { useEffect, useState } from 'react';
import { Badge, Grid, Image } from 'antd';
import { Link } from 'react-router-dom';

// images
import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png"
import image4 from "../images/image4.png"
import classNames from 'classnames';

const cardColors = [
  "bg-gradient-to-r from-teal-200 to-cyan-400",
  "bg-gradient-to-r from-orange-300 to-red-400",
  "bg-gradient-to-r from-green-200 to-lime-400",
  "bg-gradient-to-r from-fuchsia-200 to-purple-500",
];

const generateRandomBubbles = (count: number) => {
  const bubbles = [];
  for (let i = 0; i < count; i++) {
    const size = Math.floor(Math.random() * 40) + 20;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const opacity = Math.random() * 0.3 + 0.1;
    bubbles.push({ size, top, left, opacity });
  }
  return bubbles;
};

interface GameCardProps {
  link: string;
  game: string;
  number: number;
  score: number;
}

const GameCard: React.FC<GameCardProps> = ({ game, link, number, score}) => {

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md; 

  const [bubbles, setBubbles] = useState<{ size: number; top: number; left: number; opacity: number }[]>([]);

  useEffect(() => {
    setBubbles(generateRandomBubbles(3));
  }, []);

  const imageMap: { [key: number]: string } = {
    1: image1,
    2: image2,
    3: image3,
    4: image4,
};

  return (
    <Link to={link}>
      <div
        className={classNames(
          `relative p-6 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${cardColors[number - 1]}`,
          isMobile
            ? "mx-auto min-w-[calc(38vw-1px)] h-[140px]"
            : "w-[320px] min-h-[240px] max-h-[240px] h-[240px]"
        )}
      >
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              top: `${bubble.top}%`,
              left: `${bubble.left}%`,
              opacity: bubble.opacity,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        <div className="absolute top-4 left-4 flex justify-between w-[90%]">
          <Badge
            count={
              <span className="inline-block min-w-[30px] px-2 bg-white text-black font-bold text-sm leading-6 rounded-full shadow-md text-center">
                {score}
              </span>
            }
            className="bg-transparent shadow-none"
          />
          <span className={classNames("text-white text-right", isMobile ? "mr-2 text-[10px]" : "text-sm")}>
            {number === 1 ? "מילים שסיימתי" : "השיא שלי"}
            </span>
        </div>

        <div className={classNames("absolute right-4 text-center", isMobile ? "bottom-10" : "bottom-16")}>
          <div className={classNames("font-bold text-white", isMobile ? "text-[10px]" : "text-2xl")}>
            {game} 
          </div>
        </div>

        <div className="fixed -bottom-0 left-0">
          <Image
          width={isMobile ? 90 : 200}
          src={imageMap[number]}
          preview={false}
          />
        </div>
      </div>
    </Link>
  );
};

export default GameCard;