import { Button, Modal, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

interface FailMessagesProps {
  onBack?: () => void;
  onRestart?: () => void;
  title: string;
  description?: string;
}

const FinishedGameMesssage: React.FC<FailMessagesProps> = ({ onRestart, onBack, title, description }) => {

  const navigate = useNavigate();

  const restartGame = () => {
    if (onRestart) onRestart();
  }

  const handleBack = () => {
    if (onBack) {
      onBack();
      navigate(-1);
    }
  }

  const { Title } = Typography;
  const { Paragraph } = Typography;

  return (
    <div className="bg-gray-100">
      <Modal
        visible={true}
        centered
        footer={null}
        closable={false}
        maskClosable={true}
        width={400}
        className="bg-transparent shadow-none"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Title level={3} className="text-2xl font-bold text-gray-800 mb-4"> {title} </Title>
          <Paragraph className="text-2xl font-bold text-gray-800 mb-4"> {description} </Paragraph>
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

export default FinishedGameMesssage;