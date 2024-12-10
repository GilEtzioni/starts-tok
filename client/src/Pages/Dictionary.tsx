import React from 'react';
import MainLayout from "../Layout/MainLayout";
import DictionaryContainer from "../components/Dictionarys/DictionaryContainer";
import LevelButtonsContainer from '../components/Dictionarys/LevelButtonsContainer';

const Dictionary: React.FC = () => {
  return (
    <div>
      <MainLayout levelName='' courseName='' myComponent={<DictionaryContainer />} />
    </div>
  );
};

export default Dictionary;
