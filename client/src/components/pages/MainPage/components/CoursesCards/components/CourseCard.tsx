import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Progress } from 'antd';
import { generateRandomBubbles } from './Helper';
import { OneCardProps } from '../types/courseTypes';

const cardColors = [
  "bg-gradient-to-r from-lime-300 to-emerald-400", 
  "bg-gradient-to-r from-amber-200 to-yellow-400",
  "bg-gradient-to-r from-violet-200 to-purple-400",
  "bg-gradient-to-r from-sky-200 to-blue-400",
  "bg-gradient-to-r from-indigo-200 to-indigo-400",
  "bg-gradient-to-r from-rose-200 to-pink-400",
];

const CourseCard: React.FC<OneCardProps> = ({ levelHebrew, levelGerman, content, link, number, cardDetails }) => {
  const [bubbles, setBubbles] = useState<{ size: number; top: number; left: number; opacity: number }[]>([]);

  useEffect(() => {
    setBubbles(generateRandomBubbles(5));
  }, []);

  return (
    <Link to={link}>
      <div
        className={`relative w-[320px] h-[240px] p-6 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${cardColors[number - 1]}`}
      >
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className={`absolute rounded-full bg-white`}
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
              <span className="inline-block min-w-[30px] px-2 bg-white text-black font-bold text-sm leading-6 rounded-full shadow-md text-center">
                {levelGerman}
              </span>
            }
            className="bg-transparent shadow-none"
          />

          <span className="font-hebrew text-sm text-white text-right">{cardDetails}</span>
        </div>

        <div className="absolute right-4 bottom-20 text-center">
          <div className="font-hebrew text-2xl font-bold text-white">{levelHebrew}</div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[85%] text-center">
          <div className="relative w-full">
          <Progress
            percent={(parseInt(content.toString()) / 25) * 100}
            strokeColor="white"
            trailColor="rgba(255, 255, 255, 0.2)"
            strokeWidth={16}
            showInfo={false}
            className="w-full"
          />
    <p className="font-hebrew absolute w-full text-center font-bold text-gray-500/80 m-0 top-1/3 -translate-y-1/2 text-[12px]" >
      {content} / 25
    </p>
  </div>
  </div>
</div>
    </Link>
  );
};

export default CourseCard;
