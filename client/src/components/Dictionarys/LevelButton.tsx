import React, { useState } from 'react';
import { Button } from 'antd';

interface LevelButtonProps {
  buttName: string;
}

const LevelButton: React.FC<LevelButtonProps> = ({ buttName }) => {
    
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Button
      onClick={() => setIsClicked(!isClicked)}
      style={{
        backgroundColor: isClicked ? 'black' : 'grey',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
      }}
    >
      {buttName}
    </Button>
  );
};

export default LevelButton;
