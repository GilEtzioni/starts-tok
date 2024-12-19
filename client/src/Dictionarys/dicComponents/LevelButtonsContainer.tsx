import React from 'react';
import LevelButton from './TopLevelButton';

const buttonLabelsHebrew = [
    'המילים שהוספתי',
    'שפת אם',
    'מתקדם מאוד',
    'מתקדם',
    'בסיסי',
    'מתחילים',
    'מבוא',
];

const buttonLabelsEnglish = [
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2',
    'etc',
];

const LevelButtonsContainer: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
            }}
        >
            {buttonLabelsHebrew.map((labelHebrew, index) => (
                <LevelButton
                    key={index}
                    buttNameHebrew={labelHebrew}
                    buttNameEnglish={buttonLabelsEnglish[index]}
                />
            ))}
        </div>
    );
};

export default LevelButtonsContainer;