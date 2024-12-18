import React from 'react';
import MainLayout from "../Layout/MainLayout";
import DictionaryContainer from "../Dictionarys/dicComponents/DictionaryContainer";
import LevelButtonsContainer from '../Dictionarys/dicComponents/LevelButtonsContainer';
import DictioText from "../Dictionarys/DictioText";

const Dictionary: React.FC = () => {
  return (
    <div>
      {/* 
      <DictioText />
      */}
      {/*   */}
      <MainLayout levelName='' course_name='' myComponent={<DictionaryContainer />} />
      
    </div>
  );
};

export default Dictionary;
