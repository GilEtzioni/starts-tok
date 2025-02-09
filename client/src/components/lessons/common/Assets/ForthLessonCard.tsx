import { Card } from "antd";
import { IsSelected } from "../../types/FirstLessonType";
import classNames from "classnames";
import { setSuccess, setFailure, resetClicks } from "../../slices/LessonsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

interface LessonCardProps {
  word: string;
  isRightWord: boolean;
  isSelected: IsSelected
  onClick: (isSelected: IsSelected) => void; 
}

const ForthLessonCard: React.FC<LessonCardProps> = ({ word, isSelected, isRightWord, onClick }) => {
  const dispatch = useDispatch();
  const { clicks } = useSelector((state: RootState) => state.lessons);
  
  if (isRightWord && isSelected !== IsSelected.NotSelected && clicks === 1) {
    dispatch(setSuccess());
    dispatch(resetClicks());
  }
  else if (!isRightWord && isSelected !== IsSelected.NotSelected && clicks === 1) {
    dispatch(setFailure());
    dispatch(resetClicks());
  }

  return (
  <div>
    <Card
      onClick={() => onClick(isSelected)}
      className={classNames(
        'text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear',
        {
          "hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1 !important": isSelected === IsSelected.NotSelected,
          "bg-green-500 text-white border border-green-600 border-b-4 border-0 !important": isSelected === IsSelected.True,
          "bg-red-500 text-white border border-red-600 border-b-4 border-0 !important": isSelected === IsSelected.False,
        }
      )}
      >
    {word}
  </Card>
    </div>
  );
};

export default ForthLessonCard;