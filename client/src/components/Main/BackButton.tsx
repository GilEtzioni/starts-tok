import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import "../../Lessons/Messages/Main.css";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center p-5">
      <div>
        <Button className="back-button" onClick={handleBack}>
          חזור
        </Button>
      </div>
    </div>
  );
};

export default BackButton;
