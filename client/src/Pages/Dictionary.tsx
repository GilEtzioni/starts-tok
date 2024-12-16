import React from 'react';
import MainLayout from "../Layout/MainLayout";
import DictionaryContainer from "../components/Dictionarys/DictionaryContainer";
import LevelButtonsContainer from '../components/Dictionarys/LevelButtonsContainer';

const Dictionary: React.FC = () => {
  return (
    <div>
      <MainLayout levelName='' course_name='' myComponent={<DictionaryContainer />} />
    </div>
  );
};

export default Dictionary;
