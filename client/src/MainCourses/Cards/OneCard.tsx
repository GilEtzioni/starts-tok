import React from 'react';
import { Card, Progress } from 'antd';
import { Link } from 'react-router-dom';

interface OneCardProps {
  levelHebrew: string;
  levelGerman: string;
  content: string;
  link: string;
  number: string;
  cardDetails: string;
  image: string;
}

const OneCard: React.FC<OneCardProps> = ({ levelHebrew, levelGerman, content, link, number, cardDetails }) => (
  <Link to={link}>
  <Card bordered={true} hoverable={true} className={`custom-card custom-card-${number} relative w-300px h-300px p-4`}>
    {/* Level German */}
    <div className="absolute top-3 left-3 text-left">
      {levelGerman}
    </div>

    {/* Details + Level Hebrew */}
    <div className="absolute right-3 bottom-16 text-right">
      <div className="level-hebrew rtl text-2xl ">{levelHebrew}</div>
      <div className="card-details">{cardDetails}</div>
    </div>

    {/* Progress Bar */}
    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
      <Progress
        percentPosition={{ align: 'end', type: 'inner' }}
        percent={(parseInt(content.toString()) / 25) * 100}
        size={[200, 20]}
        strokeColor="white"
        showInfo={parseInt(content.toString()) !== 0}
      />
    </div>
  </Card>
  </Link>
);

export default OneCard;
