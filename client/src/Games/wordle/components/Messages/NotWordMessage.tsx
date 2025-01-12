import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { setCurrentMode, minusOneClick } from "../../slices/WordleSlice";

const NotWordMessage: React.FC = () => {
  const clicksCounter = useSelector((state: RootState) => state.wordel.clicksCounter);
  const dispatch = useDispatch();

  useEffect(() => {
    // wait 1 second before dispatch
    const timeoutId = setTimeout(() => {
      dispatch(setCurrentMode('running'));
      dispatch(minusOneClick());
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Card> המילה לא נמצאת במילון </Card>
    </>
  );
};

export default NotWordMessage;
