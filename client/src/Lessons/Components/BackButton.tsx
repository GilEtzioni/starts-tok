import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./Main.css";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // nav to the previous page
  };

  return ( <Button className="back-button" onClick={handleBack} > חזור </Button> );
};

export default BackButton;
