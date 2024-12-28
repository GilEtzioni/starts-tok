import React, { useEffect } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

interface OneCardProps {
  link: string;
  game: string;
  number: string
}


const OneCard: React.FC<OneCardProps> = ({ game, link, number}) => {

  useEffect(() => {
    console.log(number);
  }, [number]);

return (
  <Link to={link}>
    <Card bordered={true} hoverable={true} className={`custom-card custom-card-${number} relative w-300px h-300px p-4`}>
      <div className="absolute right-3 bottom-8 text-right">
        <div className="level-hebrew rtl text-2xl ">{game}</div>
      </div>
    </Card>
  </Link>
  );
}

export default OneCard;
