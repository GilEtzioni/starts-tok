import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

// Props
interface OneCardProps {
  level: React.ReactNode;
  content: string;
  link: string;
}

const OneCard: React.FC<OneCardProps> = ({ level, content, link }) => (
  <Link to={link}> 
    <Card
      title={level}
      bordered={true} 
      style={{
        width: 250,
        border: '1px solid hsl(240, 5%, 64.9%)', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <p>{content}</p>
    </Card>
  </Link>
);

export default OneCard;
