import React from 'react';
import MainLayout from "../layout/MainLayout";
import MainPage from './MainPage';
import "../index.css";

const Main: React.FC = () => {
  return (
    <div>
      <MainLayout levelName='' courseName='' myComponent={<MainPage />} />
    </div>
  );
};

export default Main;
