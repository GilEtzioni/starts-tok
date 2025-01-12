// redux
import { useSelector, useDispatch } from 'react-redux';
import { addLevel, removeLevel, addOneClick } from "../../slices/DictionarySlice";
import { RootState } from "../../../app/store";

import { Button } from 'antd';

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
      className={`border-none px-4 py-2 text-base font-bold rounded-full transition-all duration-300 ease-in-out hover:-translate-y-0.5 ${
        isClicked
          ? '!bg-gray-400 !text-white hover:!bg-gray-600 active:!bg-gray-600'
          : '!bg-black !text-white hover:!bg-gray-800 active:!bg-gray-700'
      }`}
    >
      {buttNameHebrew}
    </Button>
  );
}  

export default LevelButton;
