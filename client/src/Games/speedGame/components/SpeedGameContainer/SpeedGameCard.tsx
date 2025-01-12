import React from "react";
import { Card } from "antd";
import classNames from "classnames";
import { SelectedCard, speedGameType } from "../../types/speedGameTypes";

interface GameCardProps {
    card: speedGameType;
    onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ card, onClick }) => {

    const cardClass = classNames(
        "text-center flex justify-center items-center h-12 transition-all duration-500",
        {
            "bg-green-600 text-white": card.isSelected === SelectedCard.Success,
            "bg-red-500 text-white": card.isSelected === SelectedCard.Failure,
            "bg-black text-white": card.isSelected === SelectedCard.Clicked,
        }
    );

    return (
        <div>
            <Card
                onClick={onClick}
                hoverable={card.isSelected === SelectedCard.NotSelected}
                className={cardClass}
            >
                <p>{card.word}</p>
            </Card>
        </div>
    );
};

export default GameCard;
