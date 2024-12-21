// react + antd
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "antd"; 
import "./Main.css";

// redux
import { setRunning, addOneOrder, resetClicks, addOneClick } from "../../Main/LessonsSlice";
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
    // game 1
    if (order === 1 || order === 4) {
      if (status === "success" || status === "failure") {
        dispatch(resetClicks());
        dispatch(addOneOrder());
        dispatch(setRunning());
        setNextPage(true);
      }
    }

    // game 2 + 3
    if (order === 2 || order === 3 || order === 5 || order === 6) {
      // succes -> just go to next page
      if (status === "success") {
        dispatch(resetClicks());
        dispatch(addOneOrder());
        setNextPage(true);
        dispatch(setRunning());
        // failure -> get error card, and after one click continue
      } else {
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
    <div className="next-button-container">
      <Button className="next-button" onClick={handleClick}>
        הבא
      </Button>
    </div>
  );
};

export default NextButton;
