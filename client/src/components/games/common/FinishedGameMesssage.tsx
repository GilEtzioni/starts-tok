import { Button, Card, Modal, Typography } from 'antd';
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
            <Card
              onClick={handleBack}
              className="transition-all duration-300 ease-in-out hover:bg-blue-600 bg-blue-500 text-white border border-blue-600 border-b-4 border-0 h-8 text-center flex justify-center items-center h-12"
              >
              חזרה לדף הבית
            </Card>

            <Card
              onClick={restartGame}
              className="transition-all duration-300 ease-in-out hover:bg-green-600 bg-green-500 text-white border border-green-600 border-b-4 border-0 h-8 text-center flex justify-center items-center h-12"
            >
              שחק שוב
            </Card>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FinishedGameMesssage;