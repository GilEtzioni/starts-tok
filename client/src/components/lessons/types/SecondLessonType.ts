import { SenteceType } from "../../../api/common/types";

export interface CardType {
    id: number;
    containerOrder: number;
    word: string;
    container: string;
}

export interface TranslatedArray {
    hebrewWord: string,
    foreignWord: (string | null)[],
}

export interface foreignArrayType {
    id: number, 
    containerOrder: number,
    word: string; 
    container: string
}

export enum CardContainer {
    Up = "up",
    Down = "down"
}