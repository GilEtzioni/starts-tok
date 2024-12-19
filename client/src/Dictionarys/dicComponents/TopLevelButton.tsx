// react + antd
import React, { useState, useEffect } from 'react';
import { Row } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { addLevel, removeLevel, addOneClick } from "../DictionarySlice";
import { RootState } from "../../app/store";

interface LevelButtonProps {
  buttNameHebrew: string;
  buttNameEnglish: string;
}

const LevelButton: React.FC<LevelButtonProps> = ({ buttNameHebrew, buttNameEnglish }) => {
  const levelFilter = useSelector((state: RootState) => state.dictionay.levelFilter);
  const clicks = useSelector((state: RootState) => state.dictionay.clickFilter);
  const dispatch = useDispatch();
  
  const isClicked = levelFilter.includes(buttNameEnglish);

/*
  useEffect(() => {
    console.log("Updated level filter:", levelFilter);
    console.log("clicks:", clicks);
  }, [levelFilter, clicks]);
*/

  const handleClick = () => {
    if (isClicked) {
      dispatch(removeLevel(buttNameEnglish));
    } else {
      dispatch(addLevel(buttNameEnglish));
    }
      dispatch(addOneClick());
  };


  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isClicked ? 'grey' : "#000",
        color: "#fff",
        border: 'none',
        padding: '8px 16px',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: "background-color 0.3s ease",
      }}
    >
      {buttNameHebrew}
    </button>
  );
};

export default LevelButton;
