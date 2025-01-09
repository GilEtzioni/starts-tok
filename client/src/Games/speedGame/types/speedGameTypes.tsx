export enum Language {
    GermanWord = "GermanWord",
    HebrewWord = "HebrewWord"
}

export enum SelectedCard {
    notSelected = "notSelected",
    clicked = "clicked",
    success = "success",
    failure = "failure"
}

export type speedGameType = {
    id: number;
    language: string,
    word: string;
    isSelected: string;
}