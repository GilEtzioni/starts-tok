import React from 'react';
import { Spin, Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const LoadingComponents: React.FC = () => {
  const { Title } = Typography;

    return (
        <div className="flex items-center justify-center min-h-screen">
          <Spin
            indicator={
              <SmileOutlined
                className="text-6xl text-blue-500"
                spin
              />
            }
          />
          <Title level={4} className="mt-4">
            Loading...
          </Title>
        </div>
    )
}

export default LoadingComponents;