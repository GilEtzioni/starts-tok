import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../app/store";
import { resetWrongCounter, resetSuccesssCounter, setSelectedWord } from '../dataHangman/HangmanSlice';
import { useStartGame } from '../HangEffects';
import { useStartGameProps } from '../HangEffects';
import { WordsType } from '../../../Dictionarys/types/wordType';
import { getRandomWord , getSelectedWord } from '../HangHelper';

interface FailMessagesProps {
  words: any;
}

const FailMesssage: React.FC<FailMessagesProps> = ({ words }) => {
  const dispatch = useDispatch();

  function restartGame() {
    dispatch(resetWrongCounter());
    dispatch(resetSuccesssCounter());

    const selectedWord = getSelectedWord(words); 
    dispatch(setSelectedWord(selectedWord));
  }

    return (
        <div>
          <Modal
            visible={true}
            footer={null}
            centered
            closable={false}
            maskClosable={true}
            width={1200}
            bodyStyle={{
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <h1>  המשחק נגמר </h1>
            <Link to="/main">
                <Button>
                    חזרה לדף הבית
                </Button>
            </Link>

            <Button onClick={() => restartGame()}>
                שחק שוב
            </Button>
          </Modal>
        </div>
      );
    }

export default FailMesssage;
