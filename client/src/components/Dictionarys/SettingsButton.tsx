import React from 'react';
import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

export const SettingsButton = () => {
    return (
        <Button
          type="primary"
          icon={<SettingOutlined />}
          shape="circle"
          />
    );
};
      
export default SettingsButton;