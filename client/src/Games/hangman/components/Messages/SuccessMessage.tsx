import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { resetWrongCounter, addOneSuccesssCounter, setSelectedWord, resetSuccesssCounter } from '../../slices/HangmanSlice';
import { getSelectedWord } from '../../utils/HangHelper';
import { WordsType } from "../../../../types/types";
import { RootState } from '../../../../app/store';

interface SuccessMessageProps {
  words: WordsType[] | undefined;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ words }) => {

  const successCounter = useSelector((state: RootState) => state.hangman.successCounter);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function restartGame() {
    dispatch(resetWrongCounter());
    dispatch(addOneSuccesssCounter());
    const selectedWord = getSelectedWord(words); 
    dispatch(setSelectedWord(selectedWord));
  }

  async function handleBack() {
    const payload = { score: successCounter + 1 ?? 0 };
    const response = await axios.post('http://localhost:3000/hangman/score', payload);
    dispatch(resetWrongCounter());
    dispatch(resetSuccesssCounter());
    navigate('/main');
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Modal
        visible={true}
        footer={null}
        centered
        closable={false}
        maskClosable={true}
        width={400}
        className="bg-transparent shadow-none"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4"> !כל הכבוד </h1>
          <div className="flex flex-col gap-4">
            <Link to="/main">
              <Button onClick={() => handleBack()} type="primary" 
              className="w-full py-2 text-lg font-semibold bg-blue-500 hover:bg-blue-600 border-none shadow-md hover:shadow-lg rounded-md"
              >
                חזרה לדף הבית
              </Button>
            </Link>
            <Button type="default" onClick={() => restartGame()}   
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

export default SuccessMessage;
