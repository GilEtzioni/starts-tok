import { Card } from "antd";
import { IsSelected } from "../types/FirstLessonType";
import classNames from "classnames";
import { LanguageType } from "../../../api/common/types";

interface FirstCardProps {
  language: LanguageType;
  word: string;
  id: number;
  isSelected: string;
  onClick: (id: number, language: string) => void; 
}

const FirstCard: React.FC<FirstCardProps> = ({ language, word, id, isSelected, onClick }) => {
  return (
    <div>
      <Card
        onClick={() => onClick(id, language)}
        hoverable={isSelected === ""}
        className={classNames(
          'text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear',
          {
            "hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1": isSelected === IsSelected.NotSelected,
            "bg-black text-white border border-black border-b-4 border-0": isSelected === IsSelected.Clicked,
            "bg-green-500 text-white border border-green-600 border-b-4 border-0": isSelected === IsSelected.True,
            "bg-red-500 text-white border border-red-600 border-b-4 border-0": isSelected === IsSelected.False,
          }
        )}
      >
        {word}
      </Card>
    </div>
  );
};

export default FirstCard;