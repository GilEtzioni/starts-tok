import React from 'react';
import MainLayout from "../Layout/MainLayout";
import MainDictionary from "../Dictionarys/MainDictionary";

const Dictionary: React.FC = () => {
  return (
    <div>
      {/* 
      <DictioText />
      */}
      {/*   */}
      <MainLayout levelName='' course_name='' myComponent={<MainDictionary />} />
      
    </div>
  );
};

export default Dictionary;
