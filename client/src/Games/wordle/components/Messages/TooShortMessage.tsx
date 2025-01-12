import React, { useEffect } from 'react';
import { Card } from 'antd';
import { minusOneClick, setCurrentMode } from '../../slices/WordleSlice';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';

const TooShortMessage: React.FC = () => {
  const clicksCounter = useSelector(
    (state: RootState) => state.wordel.clicksCounter
  );
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
      <Card> התשובה קצרה מידי </Card>
    </>
  );
};

export default TooShortMessage;
