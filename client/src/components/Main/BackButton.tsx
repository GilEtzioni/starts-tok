import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Button
      onClick={handleBack}
      style={{
        backgroundColor: "#000", // Black background
        color: "#fff", // White text
        border: "none",
        fontSize: "16px",
        borderRadius: "4px",
        padding: "8px 16px",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.backgroundColor = "#333"; // Darker black on hover
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.backgroundColor = "#000"; // Reset to black
      }}
    >
      חזור
    </Button>
  );
};

export default BackButton;
