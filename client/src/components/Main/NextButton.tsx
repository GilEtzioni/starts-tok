import React from "react";
import { Button } from "antd";

interface NextButtonProps {
  currentId: number;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  onClick: () => void; // Callback for additional actions
}

const NextButton: React.FC<NextButtonProps> = ({ currentId, setCurrentId, onClick }) => {
  const handleNextId = () => {
    setCurrentId((prevId) => prevId + 1); // Increment ID
    onClick(); // Trigger additional actions (e.g., progress)
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
      }}
    >
      <Button
        onClick={handleNextId}
        style={{
          width: "200px", 
          backgroundColor: "#000", 
          color: "#fff",
          border: "none",
          fontSize: "16px",
          borderRadius: "4px",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "#333"; // Hover effect
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "#000"; // Reset hover
        }}
      >
        הבא
      </Button>
    </div>
  );
};

export default NextButton;
