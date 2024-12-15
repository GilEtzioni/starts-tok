import React, { useState, useEffect } from 'react';
import { useGlobalClicked } from "../GlobalClickedContext";

interface LessonThreeFrontProps {
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const LessonThreeFront: React.FC<LessonThreeFrontProps> = ({ setFinished, setError }) => {
  const { isClicked } = useGlobalClicked();
  const [inputValue, setInputValue] = useState<string>('');
  const requiredWord = "bin";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // change it with real data!
  useEffect(() => {
    if (!isClicked) {
      setError(false);
      console.log('Setting error to false');
    }
  }, [isClicked, setError]);

  useEffect(() => {
    if (isClicked) {
      if (inputValue === requiredWord) {
        console.log("equal");
        setFinished(true);
      } else {
        console.log("not equal");
        setError(true);
      }
    }
  }, [isClicked, inputValue, requiredWord , setFinished, setError]);


  return (
    <div>
      <h1>השלימו את המשפט</h1>
      <p>
        ich{' '}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          style={{
            border: 'none',
            borderBottom: '2px solid black',
            outline: 'none',
            fontSize: '16px',
            textAlign: 'center',
            width: `${requiredWord.length * 10}px`,
          }}
        />{' '}
        gil
      </p>
    </div>
  );
}

export default LessonThreeFront;
