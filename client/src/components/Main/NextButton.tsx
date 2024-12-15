import { useGlobalClicked } from "../../Main/Lessons/GlobalClickedContext";
import React from "react";
import { Button } from "antd";

interface NextButtonProps {
  currentId: number;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  onClick: () => void;
  finished: boolean;
  error: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ currentId, setCurrentId, onClick, finished, error }) => {
  const { setIsClicked } = useGlobalClicked();

  const handleNextId = () => {
    setIsClicked(true); // Trigger global clicked state
    if (finished || error) {
      setCurrentId((prevId) => prevId + 1);
    }
    onClick(); // Trigger additional actions
    setTimeout(() => setIsClicked(false), 0); // Reset global clicked state
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
