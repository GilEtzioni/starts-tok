import React, { useState } from 'react';

interface FilterLevelButtonProps {
  buttName: string;
}

const FilterLevelButton : React.FC<FilterLevelButtonProps> = ({ buttName }) => {
    
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      onClick={() => setIsClicked(!isClicked)}
      style={{
        backgroundColor: isClicked ? 'grey' : "#000",
        color: "#fff",
        border: 'none',
        padding: '8px 16px',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: "background-color 0.3s ease",
      }}
    >
      {buttName}
    </button>
  );
};

export default FilterLevelButton ;

