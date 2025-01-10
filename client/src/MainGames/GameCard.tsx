import React, { useEffect, useState } from 'react';
import { Badge, Image } from 'antd';
import { Link } from 'react-router-dom';

// images
import image1 from "./imgaes/image1.png";
import image2 from "./imgaes/image2.png";
import image3 from "./imgaes/image3.png";
import image4 from "./imgaes/image4.png";

interface GameCardProps {
  link: string;
  game: string;
  number: number;
  score: number;
}

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

const GameCard: React.FC<GameCardProps> = ({ game, link, number, score}) => {

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
        className={`relative w-[320px] h-[240px] p-6 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${cardColors[number - 1]}`}
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

        <div className="absolute top-4 left-4 flex justify-between w-[90%] rtl">
        <Badge
        count={
          <span
            style={{
              display: 'inline-block',
              minWidth: '30px',
              padding: '0 8px',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '16px',
              lineHeight: '24px',
              borderRadius: '12px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {score}
          </span>
        }
        style={{
          backgroundColor: 'transparent', 
          boxShadow: 'none',
        }}
/>

          <span className="text-sm text-white text-right"> {number === 1 ? "מילים שסיימתי" : "השיא שלי" } </span>
        </div>

        <div className="absolute right-4 bottom-8 text-center">
          <div className="text-2xl font-bold text-white">{ game }</div>
        </div>

        <div className="fixed -bottom-0 left-0">
          <Image
          width={200}
          src={imageMap[number]}
          preview={false}
          />
      </div>


        </div>
    </Link>
  );
};

export default GameCard;
