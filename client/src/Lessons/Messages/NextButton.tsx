// React + Ant Design
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "antd"; 
import "./Main.css";

// Redux slices
import { setRunning, addOneOrder, resetClicks, addOneClick } from "../dataLessons/LessonsSlice";
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
    if (onClick) {
      onClick();
    }
  }
  };

  return (
    <div className="flex justify-center items-center p-5">
      {(order !== 1 && order !== 4 && clicks === 0) && (
        <Button className="next-button" onClick={handleClick}>
          הבא
        </Button>
      )}
    </div>
  );
};

export default NextButton;
