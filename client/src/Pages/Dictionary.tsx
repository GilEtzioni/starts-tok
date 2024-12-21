import React from 'react';
import MainLayout from "../Layout/MainLayout";
import MainDictionary from "../Dictionarys/MainDictionary";

const Dictionary: React.FC = () => {
  return (
    <div>
      <MainLayout levelName='' courseName='' myComponent={<MainDictionary />} />
      
    </div>
  );
};

export default Dictionary;
