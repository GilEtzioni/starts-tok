import React from 'react';
import LevelButton from './LevelButton';

const buttonLabels = [
    'המילים שהוספתי',
    'שפת אם',
    'מתקדם מאוד',
    'מתקדם',
    'בסיסי',
    'מתחילים',
    'מבוא',
  ];
  
  const LevelButtonsContainer: React.FC = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        {buttonLabels.map((label) => (
          <LevelButton key={label} buttName={label} />
        ))}
      </div>
    );
  };
  
export default LevelButtonsContainer;
