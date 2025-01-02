import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { resetSuccesssCounter} from "../dataHangman/HangmanSlice";
import { useDispatch } from 'react-redux';


const BackButton: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    dispatch(resetSuccesssCounter());
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center p-5">
      <div >
        <Button
          onClick={handleBack}
        >
          חזור
        </Button>
      </div>
    </div>
  );
};

export default BackButton;
