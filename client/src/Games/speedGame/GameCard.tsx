import React from "react";
import { Card } from "antd";
import classNames from "classnames";
import { speedGameType } from "./types/speedGameTypes";

interface GameCardProps {
    card: speedGameType;
    onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ card, onClick }) => {

    const cardClass = classNames(
        "text-center flex justify-center items-center h-12 transition-all duration-500",
        {
            "bg-green-600 text-white": card.isSelected === "success",
            "bg-red-500 text-white": card.isSelected === "failure",
            "bg-black text-white": card.isSelected === "clicked",
        }
    );

    return (
        <div>
            <Card
                onClick={onClick}
                hoverable={card.isSelected === "notSelected"}
                className={cardClass}
            >
                <p>{card.word}</p>
            </Card>
        </div>
    );
};

export default GameCard;
