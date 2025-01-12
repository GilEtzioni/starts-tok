import { Card } from "antd";
import { IsSelected } from "../types/FirstLessonType";

interface FirstCardProps {
  language: string;
  word: string;
  id: number;
  isSelected: string;
  onClick: (id: number, language: string) => void; 
}

const FirstCard: React.FC<FirstCardProps> = ({ language, word, id, isSelected, onClick }) => {

const cardBackround = (() => {
  if (isSelected === IsSelected.NotSelected) return "text-center flex justify-center items-center h-12 transition ease-linear hover:bg-gray-200 hover:cursor-pointer";
  if (isSelected ===  IsSelected.Clicked) return "bg-black text-white text-center flex justify-center items-center h-12 transition ease-linear";
  if (isSelected === IsSelected.True) return "bg-green-500 text-white text-center flex justify-center items-center h-12 transition ease-linear";
  if (isSelected === IsSelected.False) return "bg-red-500 text-white text-center flex justify-center items-center h-12 transition ease-linear";
})();

  return (
    <div className="card">
      <Card
        onClick={() => onClick(id, language)}
        hoverable={isSelected === ""}
        className={cardBackround}
      >
        <p>{word}</p>
      </Card>
    </div>
  );
};

export default FirstCard;
