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
        "text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear !font-hebrew",
        {
            "bg-green-500 text-white border border-green-600 border-b-4 border-0": card.isSelected === SelectedCard.Success,
            "bg-red-500 text-white border border-red-600 border-b-4 border-0": card.isSelected === SelectedCard.Failure,
            "bg-black text-white border border-black border-b-4 border-0": card.isSelected === SelectedCard.Clicked,
            "hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1": card.isSelected === SelectedCard.NotSelected,
        }
    );

    return (
        <div>
            <Card
                onClick={onClick}
                className={cardClass}
            >
                <p>{card.word}</p>
            </Card>
        </div>
    );
};

export default GameCard;