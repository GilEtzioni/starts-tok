import React from 'react';
import LevelButton from './TopLevelButton';

const buttonLabelsHebrew = [ 'המילים שהוספתי', 'שפת אם', 'מתקדם מאוד', 'מתקדם', 'בסיסי', 'מתחילים', 'מבוא' ];

const buttonLabelsEnglish = [ 'userWords', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1' ];

const LevelButtonsContainer: React.FC = () => {
    return (
        <div className="flex justify-center items-center gap-4 flex-wrap">
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