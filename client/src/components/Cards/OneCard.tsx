import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import './Card.css';

interface OneCardProps {
  level: React.ReactNode;
  content: string;
  link: string;
}

const OneCard: React.FC<OneCardProps> = ({ level, content, link }) => (
  <Link to={link} className="card-link">
    <Card
      title={level}
      bordered={true}
      hoverable={true}
      className="custom-card"
    >
      <p>{content}</p>
    </Card>
  </Link>
);

export default OneCard;
