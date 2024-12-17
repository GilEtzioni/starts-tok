import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setRunning,
  setSuccess,
  setFailure,
  resetOrder,
  addOneOrder,
  resetClicks,
  addOneClick,
} from "../../Main/LessonsSlice";
import { RootState } from "../../app/store";

interface NextButtonProps {
  onClick?: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  const [nextPage, setNextPage] = useState(false);

  const status = useSelector((state: RootState) => state.lessons.status);
  const order = useSelector((state: RootState) => state.lessons.order);
  const clicks = useSelector((state: RootState) => state.lessons.clicks);
  const dispatch = useDispatch();

  const handleClick = () => {
    // first game (order === 1 / 4) - user can click only when success or failure
    if (order === 1 || order === 4) {
      if (status === "success" || status === "failure") {
        dispatch(resetClicks());
        dispatch(addOneOrder());
        dispatch(setRunning());
        setNextPage(true);
      }
    }

    // second and third games (order === 2 / 3 / 5 / 6)
    if (order === 2 || order === 3 || order === 5 || order === 6) {
      if (status === "success") {
        dispatch(resetClicks());
        dispatch(addOneOrder());
        setNextPage(true);
        dispatch(setRunning());
      } 
      else {
        if (clicks === 0) {
          dispatch(addOneClick());
        } else if (clicks === 1) {
          dispatch(addOneClick());
          dispatch(resetClicks());
          dispatch(addOneOrder());
          dispatch(setRunning());
          setNextPage(true);
        }
      }
    }

    if (onClick && nextPage) {
      onClick();
      setNextPage(false);
    }
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
        style={{
          width: "200px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          fontSize: "16px",
          borderRadius: "4px",
          transition: "background-color 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "#333";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "#000";
        }}
        onClick={handleClick}
      >
        הבא
      </button>
    </div>
  );
};

export default NextButton;
