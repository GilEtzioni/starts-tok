// react + antd
import { Button, Modal, Typography } from 'antd';
import { GameNameEnum } from '../../../../pages/MainPage/components/GamesCards/types/mainPageTypes';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {resetWrongCounter, resetSuccesssCounter, setSelectedWord } from "../../slices/HangmanSlice";
import { getSelectedWord } from '../../utils/HangHelper';
import { RootState } from '../../../../../app/store';

// type + patch + nav
import { WordsType } from "../../../../../api/common/types";
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAddNewScore } from '../../../requests/mutate';

interface FailMessagesProps {
  words: WordsType[] | undefined;
}

const FailMesssage: React.FC<FailMessagesProps> = ({ words }) => {

  const successCounter = useSelector((state: RootState) => state.hangman.successGamesCounter);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newScore = useAddNewScore(GameNameEnum.Hangman)

  function restartGame() {
    if (words === undefined) return;
    dispatch(resetWrongCounter());
    dispatch(resetSuccesssCounter());
    const selectedWord = getSelectedWord(words);
    dispatch(setSelectedWord(selectedWord));
  }

  async function handleBack() {
    if (words === undefined) return;
    const payload = { score: successCounter };
    newScore.mutate(payload );
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
        className={classNames("bg-transparent shadow-none")}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Typography.Title level={3} className="text-2xl font-bold text-gray-800 mb-4">המשחק נגמר</Typography.Title>
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