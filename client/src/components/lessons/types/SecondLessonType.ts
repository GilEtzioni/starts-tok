export interface CardType {
    id: number;
    containerOrder: number;
    word: string;
    container: string;
}

export interface TranslatedArray {
    hebrewString: string,
    foreignString: (string | null)[],
}

export interface foreignArrayType {
    id: number, 
    containerOrder: number,
    word: string; 
    container: string
}