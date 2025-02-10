import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Progress, Typography, Grid } from 'antd';
import { generateRandomBubbles } from './courseCardHelper';
import { OneCardProps } from '../types/courseTypes';
import classNames from 'classnames';

const { useBreakpoint } = Grid;

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
  const { Paragraph } = Typography;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  useEffect(() => {
    setBubbles(generateRandomBubbles(5));
  }, []);

  return (
    <Link to={link}>
      <div
        className={classNames(
          `relative p-4 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${cardColors[number - 1]}`,
          isMobile ? "mx-auto min-w-[calc(38vw-1px)] h-[140px]" : "w-[320px] h-[240px]"
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

        <div className="absolute top-3 left-3 flex justify-between w-[90%] rtl">
          <Badge
            count={
              <span className="inline-block min-w-[30px] px-2 bg-white text-black font-bold text-xs leading-6 rounded-full shadow-md text-center">
                {levelGerman}
              </span>
            }
            className="bg-transparent shadow-none"
          />

          <span className={classNames("text-white text-right", isMobile ? "mr-2 text-[10px]" : "text-sm")}>
            {cardDetails}
          </span>
        </div>

        <div className={classNames("absolute right-3 text-center", isMobile ? "bottom-10" : "bottom-16")}>
          <div className={classNames("font-bold text-white", isMobile ? "text-[10px]" : "text-2xl")}>
            {levelHebrew}
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[85%] text-center">
          <div className="relative w-full">
            <Progress
              percent={(parseInt(content.toString()) / 25) * 100}
              strokeColor="white"
              trailColor="rgba(255, 255, 255, 0.2)"
              strokeWidth={isMobile ? 8 : 16} 
              showInfo={false}
              className="w-full"
            />
            <Paragraph
              className={classNames(
                "absolute w-full text-center font-bold text-gray-500/80 m-0 -translate-y-1/2",
                isMobile ? "top-[10px] text-[10px]" : "top-1/3 text-[12px]"
              )}
            >
              {content} / 25
            </Paragraph>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
