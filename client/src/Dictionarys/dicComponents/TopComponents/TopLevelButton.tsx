// redux
import { useSelector, useDispatch } from 'react-redux';
import { addLevel, removeLevel, addOneClick } from "../../dataDictionary/DictionarySlice";
import { RootState } from "../../../app/store";

interface LevelButtonProps {
  buttNameHebrew: string;
  buttNameEnglish: string;
}

const LevelButton: React.FC<LevelButtonProps> = ({ buttNameHebrew, buttNameEnglish }) => {
  const levelFilter = useSelector((state: RootState) => state.dictionay.levelFilter);
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
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isClicked ? 'grey' : "#000",
        color: "#fff",
        border: 'none',
        padding: '8px 16px',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: "background-color 0.3s ease",
        borderRadius: "20px",
      }}
    >
      {buttNameHebrew}
    </button>
  );
};

export default LevelButton;
