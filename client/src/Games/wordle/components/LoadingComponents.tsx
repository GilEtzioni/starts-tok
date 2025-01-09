import React from 'react';
import { Spin, Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const LoadingComponents: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <Spin
            indicator={
              <SmileOutlined
                style={{ fontSize: 48, color: '#1890ff' }}
                spin
              />
            }
          />
          <Typography.Title level={4} className="mt-4">
            Loading...
          </Typography.Title>
        </div>
    )
}

export default LoadingComponents;