export interface CardType {
    id: number;
    containerOrder: number;
    word: string;
    container: string;
}

export interface TranslatedArray {
    hebrewString: string,
    germanString: (string | null)[],
}

export interface germanArrayType {
    id: number, 
    containerOrder: number,
    word: string; 
    container: string
}