import { useGlobalClicked } from "../../Main/Lessons/GlobalClickedContext";
import React from "react";

interface NextButtonProps {
  currentId: number;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  onClick: () => void;
  finished: boolean;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const NextButton: React.FC<NextButtonProps> = ({
  setError,
  setFinished,
  currentId,
  setCurrentId,
  onClick,
  finished,
  error,
}) => {
  const { setIsClicked } = useGlobalClicked();

  const handleNextId = () => {
    setIsClicked(true); // global clicked
    if (finished || error) {
      setCurrentId((prevId) => prevId + 1);
      onClick(); // call next id function
    }
    setTimeout(() => {
      setIsClicked(false); // give it time (without it, it won't work)
      //setError(false);
      // setFinished(false);
    }, 0);
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
      <button
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
          (e.target as HTMLElement).style.backgroundColor = "#333";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "#000";
        }}
      >
        הבא
      </button>
    </div>
  );
};

export default NextButton;
