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
  
const cardBackround = (() => {
  if (isSelected === IsSelected.NotSelected) return "hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1";
  if (isSelected === IsSelected.Clicked) return "bg-black text-white border border-black border-b-4 border-0";
  if (isSelected === IsSelected.True) return "bg-green-500 text-white border border-green-600 border-b-4 border-0";
  if (isSelected === IsSelected.False) return "bg-red-500 text-white border border-red-600 border-b-4 border-0";
  return "";
})();

  return (
    <div>
      <Card
        onClick={() => onClick(id, language)}
        hoverable={isSelected === ""}
        className={classNames(
          'text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear', 
          cardBackround,
        )}
      >
        {word}
      </Card>
    </div>
  );
};

export default FirstCard;
