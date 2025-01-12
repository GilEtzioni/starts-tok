export enum Language {
    GermanWord = "germanWord",
    HebrewWord = "hebrewWord"
}

export enum SelectedCard {
    NotSelected = "notSelected",
    Clicked = "clicked",
    Success = "success",
    Failure = "failure"
}

export type speedGameType = {
    id: number;
    language: string,
    word: string;
    isSelected: string;
}