import React from 'react';
import MainLayout from "../layout/MainLayout";
import MainDictionary from "../dictionary/MainDictionary";

const Dictionary: React.FC = () => {
  return (
    <div>
      <MainLayout levelName='' courseName='' myComponent={<MainDictionary />} />
      
    </div>
  );
};

export default Dictionary;
