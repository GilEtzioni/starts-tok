import React from "react";
import { Card } from "antd";

interface LessonTwoCardsProps {
  upperContainer: any[];
  midContainer: any[];
  cardsContainer: any[];
  handleCardClick: (card: any, from: string) => void;
  upperCapacity: number;
}

const LessonTwoCards: React.FC<LessonTwoCardsProps> = ({
  upperContainer,
  midContainer,
  cardsContainer,
  handleCardClick,
}) => {
  const handleHoverEffect = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    const cardElement = e.currentTarget as HTMLElement;
    if (isEntering) {
      cardElement.style.transform = "translateY(-5px)";
      cardElement.style.backgroundColor = "hsl(220, 13%, 91%)";
    } else {
      cardElement.style.transform = "translateY(0px)";
      cardElement.style.backgroundColor = "white";
    }
  };

  const renderCard = (name: string, id: string, status: string, from: string) => (
    <Card
      key={id}
      onClick={() => handleCardClick([name, id, status], from)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid hsl(240, 5%, 64.9%)",
        borderRadius: "8px",
        height: "40px",
        padding: "0 16px",
        margin: "5px",
        backgroundColor: "white",
        color: "black",
        transition: "transform 0.3s ease, background-color 0.3s ease",
      }}
      onMouseEnter={(e) => handleHoverEffect(e, true)}
      onMouseLeave={(e) => handleHoverEffect(e, false)}
    >
      {name}
    </Card>
  );

  return (
    <>
      {/* upper container */}
      <div
        className="upper-container"
        style={{
          position: "relative",
          width: "80%",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "10px",
          margin: "20px auto 15px",
        }}
      >
        {upperContainer.map(([name, id, status]) => renderCard(name, id, status, "upperContainer"))}
      </div>

      {/* mid container */}
      <div
        className="mid-container"
        style={{
          position: "relative",
          width: "80%",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "10px",
          margin: "15px auto 20px",
        }}
      >
        {midContainer.map(([name, id, status]) => renderCard(name, id, status, "midContainer"))}
      </div>

      {/* cards container */}
      <div
        className="cards-container"
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "10px",
          margin: "40px auto",
        }}
      >
        {cardsContainer.map(([name, id, status]) => renderCard(name, id, status, "cardsContainer"))}
      </div>
    </>
  );
};

export default LessonTwoCards;
