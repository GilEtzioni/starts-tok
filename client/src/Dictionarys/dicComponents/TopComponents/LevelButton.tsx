import React, { useState } from 'react';
import { Button } from 'antd';
import "./Top.css";

interface LevelButtonProps {
  buttName: string;
}

const LevelButton: React.FC<LevelButtonProps> = ({buttName}) => {
    
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Button onClick={() => setIsClicked(!isClicked)} >
      {buttName}
    </Button>
  );
};

export default LevelButton;

