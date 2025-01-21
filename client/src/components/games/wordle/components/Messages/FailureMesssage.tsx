import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMode, resetSuccess ,resetClicks } from '../../slices/WordleSlice';
import { RootState } from '../../../../../app/store';

// fetching
import { useAddNewScore } from '../../../requests/mutate';

// types + helping functions
import { CurrentMode } from '../../ types/WordelType';
import { WordsType } from '../../../../../api/common/types';
import { shuffleAllWords } from '../../utilts/wordleHelper';
import { GameNameEnum } from '../../../../pages/MainPage/components/GamesCards/types/mainPageTypes';
import classNames from 'classnames';

interface FailMessagesProps {
  words: WordsType[] | undefined;
}

const FailureMesssage: React.FC<FailMessagesProps> = ({ words}) => {
  const successCounter = useSelector((state: RootState) => state.wordel.successCounter);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newScore = useAddNewScore(GameNameEnum.Wordle)

  function restartGame() {
    if(words === undefined) return;
    dispatch(setCurrentMode(CurrentMode.Running));
    dispatch(resetClicks());
    shuffleAllWords(words);
  }

  async function handleBack() {
    const payload = { score: successCounter};
    newScore.mutate(payload);

    dispatch(setCurrentMode(CurrentMode.Running));
    dispatch(resetSuccess());
    dispatch(resetClicks());

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
        className={classNames("bg-transparent shadow-none")}

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

export default FailureMesssage;
