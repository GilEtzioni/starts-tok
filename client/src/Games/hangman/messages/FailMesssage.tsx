// react + antd
import { Button, Modal } from 'antd';
import axios from "axios";

// redux
import { useDispatch, useSelector } from 'react-redux';
import {resetWrongCounter, resetSuccesssCounter, setSelectedWord } 
from '../dataHangman/HangmanSlice';
import { getSelectedWord } from '../HangHelper';
import { RootState } from '../../../app/store';

// type + patch + nav
import { WordsType } from '../../../Dictionarys/types/wordType';
import { useNavigate } from 'react-router-dom';

interface FailMessagesProps {
  words: Array<WordsType>;
}

const FailMesssage: React.FC<FailMessagesProps> = ({ words }) => {

  const successCounter = useSelector((state: RootState) => state.hangman.successCounter);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function restartGame() {
    dispatch(resetWrongCounter());
    dispatch(resetSuccesssCounter());
    const selectedWord = getSelectedWord(words);
    dispatch(setSelectedWord(selectedWord));
  }

  async function handleBack() {
    const payload = { score: successCounter ?? 0 };
    const response = await axios.post('http://localhost:3000/hangman/score', payload);
    dispatch(resetWrongCounter());
    dispatch(resetSuccesssCounter());
    navigate('/main');
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Modal
        visible={true}
        centered
        footer={null}
        closable={false}
        maskClosable={true}
        width={400}
        bodyStyle={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">המשחק נגמר</h1>
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleBack}
              type="primary"
              className="w-full py-2 text-lg font-semibold bg-blue-500 hover:bg-blue-600 border-none shadow-md hover:shadow-lg rounded-md"
            >
              חזרה לדף הבית
            </Button>

            <Button
              type="default"
              onClick={restartGame}
              className="w-full py-2 text-lg font-semibold !bg-green-500 hover:!bg-green-600 !border-none !shadow-md hover:!shadow-lg rounded-md !text-white"
            >
              שחק שוב
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FailMesssage;
