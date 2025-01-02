import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { resetWrongCounter, addOneSuccesssCounter, setSelectedWord } from '../dataHangman/HangmanSlice';
import { getSelectedWord } from '../HangHelper';
import { WordsType } from '../../../Dictionarys/types/wordType'; 

interface SuccessMessageProps {
  words: Array<WordsType>;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ words }) => {
  const dispatch = useDispatch();

  function restartGame() {
    dispatch(resetWrongCounter());
    dispatch(addOneSuccesssCounter());
    const selectedWord = getSelectedWord(words); 
    console.log("+1");
    dispatch(setSelectedWord(selectedWord));
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
        bodyStyle={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4"> !כל הכבוד </h1>
          <div className="flex flex-col gap-4">
            <Link to="/main">
              <Button type="primary" 
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
