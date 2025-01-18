import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import { minusOneClick, setCurrentMode } from '../../slices/WordleSlice';
import { useDispatch } from 'react-redux';
import { CurrentMode } from '../../ types/WordelType';

const NotWordMessage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const hasShownMessage = useRef(false);

  useEffect(() => {

    if (!hasShownMessage.current) {
      messageApi.open({
        type: 'error',
        content: 'המילה לא נמצאת במילון',
      });
      hasShownMessage.current = true;
    }

    const timeoutId = setTimeout(() => {
      dispatch(setCurrentMode(CurrentMode.Running));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, messageApi]);

  return <>{contextHolder}</>;
};

export default NotWordMessage;