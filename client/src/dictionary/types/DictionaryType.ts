export enum EnglishLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

export enum HebrewLevel {
  מבוא = "מבוא",
  בסיסי = "בסיסי",
  בינוני = "בינוני",
  מתקדם = "מתקדם",
  מתקדםמאוד = "מתקדם מאוד",
  שפתאם = "שפת אם",
}

export type KnowlageType = {
  isEx: boolean;
  isVy: boolean;
  isQueistion: boolean;
};

export interface UpdatedWordType {
  id: number; 
  knowlage: string;
}

export enum DictionaryColors {
  Red = "red",
  Blue = "blue",
  Green = "green",
  Gray = "gray",
}

export interface IconItem {
  id: number;
  isClicked: boolean;
  defaultColor: DictionaryColors;
  activeColor: DictionaryColors;
  icon: React.JSX.Element;
};