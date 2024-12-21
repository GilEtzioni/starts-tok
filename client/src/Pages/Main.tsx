import React from 'react';
import MainLayout from "../Layout/MainLayout";
import MainPage from './MainPage';

const Main: React.FC = () => {
  return (
    <div>
      <MainLayout levelName='' courseName='' myComponent={<MainPage />} />
    </div>
  );
};

export default Main;
