import { Card } from "antd";
import "./First.css"

interface FirstCardProps {
  language: string;
  word: string;
  id: number;
  isSelected: string;
  onClick: (id: number, language: string) => void; 
}

const FirstCard: React.FC<FirstCardProps> = ({ language, word, id, isSelected, onClick }) => {

  
  const currName = (() => {
    if (isSelected === "") return "notSelected";
    if (isSelected === "clicked") return "clicked";
    if (isSelected === "true") return "success";
    if (isSelected === "false") return "failure";
  })();

  return (
    <div className="card">
      <Card onClick={() => onClick(id, language)} 
        hoverable={isSelected === ""} 
        className={currName}
      >
        <p>{word}</p>
      </Card>
      </div>
  );
};

export default FirstCard;
