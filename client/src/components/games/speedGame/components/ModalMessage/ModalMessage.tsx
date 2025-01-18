// react + antd
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../../../app/store";
import { resetSuccesssCounter, resetWrongCounter } from '../../slices/SpeedGameSlice'; 

// types + functions
import { speedGameType } from '../../types/speedGameTypes';
import { WordsType } from "../../../../../types/types";
import { shuffleAllWords, createGameArray } from "../../utils/speedHelper";

import { useAddNewScore } from '../../../api/fetchingGame';
import { GameNameEnum } from '../../../../pages/MainPage/components/GamesCards/types/mainPageTypes';

interface ModalProps {
  words: WordsType[] | undefined;
  setGermanArray: (array: speedGameType[]) => void; 
  setHebrewArray: (array: speedGameType[]) => void; 
}
const ModalMessage: React.FC<ModalProps> = ({ words, setGermanArray, setHebrewArray }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const successCounter = useSelector((state: RootState) => state.speedGame.succcessCounter);
  const newScore = useAddNewScore(GameNameEnum.SpeedGame)

  if (!words) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>Words not available.</p>
      </div>
    );
  }

  function newGame() {
    // reset reudx
    dispatch(resetSuccesssCounter());
    dispatch(resetWrongCounter());

    // create new game
    const shuffledArray = shuffleAllWords(words);
    const { shuffledGermanArray, shuffledHebrewArray } = createGameArray(shuffledArray);

    setGermanArray(shuffledGermanArray || []);
    setHebrewArray(shuffledHebrewArray || []);

    setIsModalVisible(false); // close the modal
  }

  function goToHomePage() {
    const payload = { score: successCounter };
    newScore.mutate(payload );

    dispatch(resetSuccesssCounter());
    dispatch(resetWrongCounter());

    setIsModalVisible(false); // close the modal
    navigate(`/main`);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Modal
        visible={isModalVisible}
        className={classNames("w-full max-w-lg", "mx-auto", "mt-20")}
        footer={null}
        closable={false}
        maskClosable={true}
      >
        <div className={classNames("bg-transparent shadow-none")}>
          <div className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-200">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
              הצלחת למצוא {successCounter} זוגות
            </h1>
            <div className="flex flex-col gap-4">
              <Button
                onClick={goToHomePage}
                type="primary"
                className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 border-none shadow-md hover:shadow-lg rounded-lg transition-all duration-200"
              >
                חזרה לדף הבית
              </Button>

              <Button
                type="default"
                onClick={newGame}
                className="w-full py-3 text-lg font-semibold !bg-green-600 hover:!bg-green-500 !border-none shadow-md hover:shadow-lg rounded-lg !text-white transition-all duration-200"
              >
                שחק שוב
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalMessage;
