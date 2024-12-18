// react + antd
import React, { useState, useEffect } from 'react';
import { Row } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { addLevel, removeLevel } from "../DictionarySlice";
import { RootState } from "../../app/store";

interface LevelButtonProps {
  buttName: string;
}

const LevelButton: React.FC<LevelButtonProps> = ({ buttName }) => {
  const levelFilter = useSelector((state: RootState) => state.dictionay.levelFilter);
  const dispatch = useDispatch();
  
  const isClicked = levelFilter.includes(buttName);

  /*
  useEffect(() => {
    console.log("Updated level filter:", levelFilter);
  }, [levelFilter]);
  */

  const handleClick = () => {
    if (isClicked) {
      dispatch(removeLevel(buttName));
    } else {
      dispatch(addLevel(buttName));
    }
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
      {buttName}
    </button>
  );
};

export default LevelButton;
