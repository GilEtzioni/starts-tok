import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./Main.css";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return ( <Button className="back-button" onClick={handleBack} > חזור </Button> );
};

export default BackButton;
