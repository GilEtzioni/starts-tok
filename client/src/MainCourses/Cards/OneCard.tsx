import React from 'react';
import { Card, Progress } from 'antd';
import { Link } from 'react-router-dom';
import './Card.css';


interface OneCardProps {
  levelHebrew: string;
  levelGerman: string;
  content: string;
  link: string;
  number: string;
  cardDetails: string;
  image: string;
}

const OneCard: React.FC<OneCardProps> = ({
  levelHebrew,
  levelGerman,
  content,
  link,
  number,
  cardDetails,
  image
}) => (
  <Link to={link} className="card-link">
    <Card
      /* cover={<img alt="example" src={image} />} */
      bordered={true}
      hoverable={true}
      className={`custom-card custom-card-${number}`}
    >
      {/* hebre + german level */}
      <div className="card-row card-row-languages">
        <div className="level-german">{levelGerman}</div>
        <div className="level-hebrew">{levelHebrew}</div>
      </div>

      {/* details */}
      <div className="card-row card-row-details">
        <div className="card-details">{cardDetails}</div>
      </div>

      {/* progress bar */}
      <div className="progress-container">
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
