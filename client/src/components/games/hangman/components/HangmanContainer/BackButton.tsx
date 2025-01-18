import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import { resetSuccesssCounter, setSelectedWord} from "../../slices/HangmanSlice";
import { useDispatch } from 'react-redux';
import { getRandomWord } from "../../utils/HangHelper";
import { WordsType } from "../../../../../api/common/types";

interface BackButtonProps {
  words: WordsType[] | undefined;
}

const BackButton: React.FC<BackButtonProps> = ({ words }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/main");
    if (words === undefined) return;
    const selectedWord = getRandomWord(words);
    setSelectedWord([selectedWord])
    dispatch(resetSuccesssCounter());
  };

  return (
    <div className="flex justify-center items-center p-5">
      <div >
        <Button
            className="!bg-black !text-white hover:!bg-gray-800 active:!bg-gray-900 !border-none !flex !items-center !justify-center !w-22 !h-8 !rounded-md !shadow-md !transition-all !duration-200"
            onClick={handleBack}
          >
            <p className="!text-white !text-center !m-0 font-semibold !font-hebrew">חזור</p>
          </Button>
      </div>
    </div>
  );
};

export default BackButton;
