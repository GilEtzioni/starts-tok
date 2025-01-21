// redux
import { useSelector, useDispatch } from 'react-redux';
import { addLevel, removeLevel, addOneClick } from "../../slices/DictionarySlice";
import { RootState } from "../../../../app/store";

import { Button, Card } from 'antd';
import classNames from 'classnames';

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
    <Card
      onClick={handleClick}
     className={classNames("duration-300 ease-in-out hover:-translate-y-0.5 bg-green-500 text-white border border-green-600 border-b-4 border-0 h-8 text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear !font-hebrew", {
        'bg-green-600 hover:cursor-pointer' : isClicked,
        'hover:bg-green-600 hover:cursor-pointer' : !isClicked
      })}
      >
      {buttNameHebrew}
    </Card>
  );
} 

export default LevelButton;