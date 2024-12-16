import React from 'react';
import MainLayout from "../Layout/MainLayout";
// import CardContainer from '../components/Cards/CardContainer';
import MainPage from './MainPage';

const Main: React.FC = () => {
  return (
    <div>
      <MainLayout levelName='' course_name='' myComponent={<MainPage />} />
    </div>
  );
};

export default Main;
