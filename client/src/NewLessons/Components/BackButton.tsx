import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./Main.css";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // nav to the previous page
  };

  return (
    <div className="back-button-container">
      <div className="back-button-wrapper">
        <Button
          className="back-button" 
          onClick={handleBack}
        >
          חזור
        </Button>
      </div>
    </div>
  );
};

export default BackButton;
