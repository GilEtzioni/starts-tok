import React, { useState } from 'react';
import { CloseOutlined, CheckOutlined, QuestionOutlined } from '@ant-design/icons';

const DictionaryIcons: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const icons = [
    { id: 'close', defaultColor: 'grey', activeColor: 'red', icon: <CloseOutlined /> },
    { id: 'check', defaultColor: 'grey', activeColor: 'green', icon: <CheckOutlined /> },
    { id: 'question', defaultColor: 'grey', activeColor: 'blue', icon: <QuestionOutlined /> },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '8px' }}>
      {icons.map(({ id, defaultColor, activeColor, icon }) => (
        <div
          key={id}
          onClick={() => setActiveIcon(id)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          className="icon-container"
        >
          {React.cloneElement(icon, {
            style: {
              fontSize: '24px',
              color: activeIcon === id ? activeColor : defaultColor,
              transition: 'color 0.3s',
            },
          })}
        </div>
      ))}
      <style>
        {`
          .icon-container:hover {
            background-color: #f0f0f0; /* Grey hover effect */
          }
        `}
      </style>
    </div>
  );
};

export default DictionaryIcons;
