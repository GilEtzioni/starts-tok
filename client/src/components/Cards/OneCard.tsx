import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

interface OneCardProps {
  level: React.ReactNode;
  content: string;
  link: string;
}

const OneCard: React.FC<OneCardProps> = ({ level, content, link }) => (
  <Link to={link} style={{ textDecoration: 'none' }}>
    <Card
      title={level}
      bordered={true}
      style={{
        width: 250,
        border: '1px solid hsl(240, 5%, 64.9%)',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, background-color 0.3s ease', 
      }}
      bodyStyle={{
        transition: 'background-color 0.3s ease',
      }}
      hoverable={true} 
      onMouseEnter={(e) => {
        const cardElement = e.currentTarget as HTMLElement;
        cardElement.style.transform = 'translateY(-5px)'; 
        cardElement.style.backgroundColor = 'hsl(220, 13%, 91%)'; 
      }}
      onMouseLeave={(e) => {
        const cardElement = e.currentTarget as HTMLElement;
        cardElement.style.transform = 'translateY(0px)'; 
        cardElement.style.backgroundColor = 'white'; 
      }}
    >
      <p>{content}</p>
    </Card>
  </Link>
);

export default OneCard;
