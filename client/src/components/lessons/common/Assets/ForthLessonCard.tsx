import { Card } from "antd";
import { IsSelected } from "../../types/FirstLessonType";
import classNames from "classnames";
import { setSuccess, setFailure } from "../../slices/LessonsSlice";
import { useDispatch } from "react-redux";

interface LessonCardProps {
  word: string;
  isRightWord: boolean;
  isSelected: IsSelected
  onClick: (isSelected: IsSelected) => void; 
}

const ForthLessonCard: React.FC<LessonCardProps> = ({ word, isSelected, isRightWord, onClick }) => {
  const dispatch = useDispatch();
  if (isRightWord && isSelected !== IsSelected.NotSelected) {
    dispatch(setSuccess());
  }
  else if (!isRightWord && isSelected !== IsSelected.NotSelected) {
    dispatch(setFailure());
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