import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Typography } from 'antd';

const LoadingPage: React.FC = () => {

    const { Title } = Typography;

return (
  <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center justify-center space-y-6">
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        className="text-blue-600"
      />
      <Title level={4} className="text-gray-700">
      ...המתן בבקשה. המשחק בטעינה
      </Title>
    </div>
  </div>
  )
}

export default LoadingPage;