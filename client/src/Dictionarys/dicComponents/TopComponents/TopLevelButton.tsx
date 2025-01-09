// redux
import { useSelector, useDispatch } from 'react-redux';
import { addLevel, removeLevel, addOneClick } from "../../dataDictionary/DictionarySlice";
import { RootState } from "../../../app/store";

import { Button } from 'antd';

import "./Top.css";

interface LevelButtonProps {
  buttNameHebrew: string;
  buttNameEnglish: string;
}

const LevelButton: React.FC<LevelButtonProps> = ({ buttNameHebrew, buttNameEnglish }) => {
  const levelFilter = useSelector((state: RootState) => state.dictionary.levelFilter);
  const dispatch = useDispatch();
  
  const isClicked = levelFilter.includes(buttNameEnglish);

  const handleClick = () => {
    if (isClicked) {
      dispatch(removeLevel(buttNameEnglish));
    } else {
      dispatch(addLevel(buttNameEnglish));
    }
    dispatch(addOneClick());
  };

  return (
    <Button
      onClick={handleClick}
      className={`custom-button ${isClicked ? 'custom-button-clicked' : ''}`}
    >
      {buttNameHebrew}
    </Button>
  );
};

export default LevelButton;
