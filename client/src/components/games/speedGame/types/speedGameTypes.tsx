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
    id: string;
    language: Language,
    word: string;
    isSelected: SelectedCard;
    index: number
}

export enum SpeedGameMode {
    Running = "running",
    Loading = "loading",
}